using System;
using System.Collections.Generic;

// Класс описывающий одно сообщение от клиента и метод его сериализации
public class CometMessage
{
    public string UserName;
    public string Message;
    public string Serialize()
    {
        return "{'user': '" + UserName + "', 'message': '" + Message + "'}";
    }
}

// Собственно, серверная часть
public static class CometServer
{
    // вспомогательный объект для блокировки ресурсов многопоточного приложения
    private static Object _lock = new Object();

    // Список, хранящий состояние всех подключенных клиентов
    private static List<CometAsyncState> _clientStateList = new List<CometAsyncState>();

    // Возвращаем сообщение каждому подключенному клиенту
    public static void PushMessage(CometMessage message)
    {
        lock (_lock)
        {
            // Пробегаем по списку всех подключенных клиентов
            foreach (CometAsyncState clientState in _clientStateList)
            {
                if (clientState.CurrentContext.Session != null)
                {
                    // И пишем в выходной поток текущее сообщение
                    clientState.CurrentContext.Response.Write(message.Serialize());
                    // После чего завершаем запрос - вот именно после этого результаты 
                    // запроса пойдут ко всем подключенным клиентам
                    clientState.CompleteRequest();
                }
            }
        }
    }

    // Срабатывает кажды раз при запуске клиентом очережного запроса Long poll
    // так как при этом HttpContext клиента изменяется, то на до обновить
    // все изменившиеся данные клиента в списке, идентифицируемом по гуиду,
    // который у клиента в течение работы остается постоянным
    public static void UpdateClient(CometAsyncState state, String guid)
    {
        lock (_lock)
        {
            // ищем клиента в списке по его гуиду
            CometAsyncState clientState = _clientStateList.Find(s => s.ClientGuid == guid);
            if (clientState != null)
            {
                // и если он нашелся, то обновляем все его параметры
                clientState.CurrentContext = state.CurrentContext;
                clientState.ExtraData = state.ExtraData;
                clientState.AsyncCallback = state.AsyncCallback;
            }
        }
    }
    
    // Регистрация клиента
    public static void RegicterClient(CometAsyncState state)
    {
        lock (_lock)
        {
            // Присваиваем гуид и добавляем в список
            state.ClientGuid = Guid.NewGuid().ToString("N");
            _clientStateList.Add(state);
        }
    }

    // Разрегистрация клиента
    public static void UnregisterClient(CometAsyncState state)
    {
        lock (_lock)
        {
            // Просто удаляем его из списка
            _clientStateList.Remove(state);
        }
    }
}

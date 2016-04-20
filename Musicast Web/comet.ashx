<%@ WebHandler Language="C#" Class="CometAsyncHandler" %>

using System;
using System.Web;
using System.Threading;

public class CometAsyncHandler : IHttpAsyncHandler, System.Web.SessionState.IReadOnlySessionState
{
    #region IHttpAsyncHandler Members
    
    public IAsyncResult BeginProcessRequest(HttpContext ctx, AsyncCallback cb, Object obj)
    {
        // Готовим объект для передачи его в QueueUserWorkItem
        CometAsyncState currentAsyncState = new CometAsyncState(ctx, cb, obj);
        
        // Добавляем в тредпул новый ждущий поток
        ThreadPool.QueueUserWorkItem(new WaitCallback(RequestWorker), currentAsyncState);

        return currentAsyncState;
    }
    
    public void EndProcessRequest(IAsyncResult ar)
    {
    }

    #endregion
 
     

    #region IHttpHandler Members
    // IHttpHandler Members - просто пустые заглушки, так как нам не требуется реализация синхронных методов
    
    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
    
    public void ProcessRequest(HttpContext context)
    {
    }
    
    #endregion
    
    // Основная функция рабочего потока
    private void RequestWorker(Object obj)
    {
        // obj - второй параметр при вызове ThreadPool.QueueUserWorkItem()
        CometAsyncState state = obj as CometAsyncState;

        string command = state.CurrentContext.Request.QueryString["cmd"];
        string guid = state.CurrentContext.Request.QueryString["guid"];

        switch (command)
        {
            case "register":
                // Регистрируем клиента в очереди сообщений
                CometServer.RegicterClient(state);
                state.CurrentContext.Response.Write(state.ClientGuid.ToString());
                state.CompleteRequest();
                break;
            case "unregister":
                // Удаляем клиента из очереди сообщений
                CometServer.UnregisterClient(state);
                state.CompleteRequest();
                break;
            case "send":
                // Отсылка сообщения
                string message = state.CurrentContext.Request.QueryString["message"];
                string userName = state.CurrentContext.Request.QueryString["user"];
                CometServer.PushMessage(new CometMessage() { Message = message, UserName = userName });
                state.CompleteRequest();
                break;
            default:
                // При реконнекте клиента
                if (guid != null)
                {
                    CometServer.UpdateClient(state, guid);
                }
                break;

        }
    }
}
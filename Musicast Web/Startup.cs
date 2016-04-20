using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Musicast_Web.Startup))]
namespace Musicast_Web
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}

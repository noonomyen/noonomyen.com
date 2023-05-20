use std::path::Path;
use std::collections::HashMap;
use actix_web::{ web, App, HttpResponse, HttpServer, Responder, HttpRequest };

pub enum ServerMode<'lf> {
    HTTP { ip: &'lf str, port: u16 },
    UDS { uds_path: &'lf Path },
}

async fn index() -> impl Responder {
    return HttpResponse::Ok()
        .content_type("text/plain")
        .body("For redirects, the web page hasn't been done yet ^_^")
}

async fn redirector(req: HttpRequest, data_map: web::Data::<HashMap<String, String>>) -> impl Responder {
    let path = req.path();
    let value = data_map.get(path);
    if let Some(target) = value {
        return HttpResponse::TemporaryRedirect()
            .append_header(("Location", target.to_string()))
            .finish();
    } else {
        return HttpResponse::NotFound().finish();
    }
}

#[actix_web::main]
pub async fn start(bind: ServerMode, map: HashMap<String, String>) -> std::io::Result<()> {
    let app = move || App::new()
        .app_data(web::Data::new(map.clone()))
        .route("/", web::get().to(index))
        .default_service(web::get().to(redirector));

    match bind {
        ServerMode::HTTP { ip, port } => HttpServer::new(app).bind((ip, port))?.run().await,
        ServerMode::UDS { uds_path } => HttpServer::new(app).bind_uds(uds_path)?.run().await
    }
}

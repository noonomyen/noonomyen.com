use std::collections::HashMap;
use actix_web::{web, App, HttpResponse, HttpServer, Responder, HttpRequest};

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
pub async fn start(ip: &str, port: u16, map: HashMap<String, String>) -> std::io::Result<()> {
    HttpServer::new(move || App::new()
        .app_data(web::Data::new(map.clone()))
        .route("/", web::get().to(index))
        .default_service(web::get().to(redirector))
    )
    .bind((ip, port))?.run().await
}

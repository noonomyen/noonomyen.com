use std::env;
use std::path::Path;
use std::process::exit;

mod map;
mod server;

fn main() {
    let args: Vec<String> = env::args().collect();

    if !(args.len() == 4) {
        println!("{} [ip] [port] [list file]", Path::new(&args[0]).file_name().unwrap().to_str().unwrap());
        println!("");
        println!("NAME: {}", env!("CARGO_PKG_NAME"));
        println!("VERSION: {}", env!("CARGO_PKG_VERSION"));
        println!("DESCRIPTION: {}", env!("CARGO_PKG_DESCRIPTION"));
        exit(1);
    }

    let ip = &args[1];
    let port = args[2].parse::<u16>().unwrap();
    let fp: &Path = Path::new(&args[3]);
    if !fp.exists() {
        println!("'{}' file not found", args[1]);
        exit(1);
    } else {
        let map = map::new(fp);
        let _ = server::start(ip, port, map);
    }

    exit(0);
}

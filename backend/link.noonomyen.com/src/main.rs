use std::env;
use std::path::Path;
use std::process::exit;

mod map;
mod server;

fn help(exit_code: i32, args: &Vec<String>) {
    let exec_name = Path::new(&args[0]).file_name().unwrap().to_str().unwrap();
    println!("{} http [ip] [port] [list file]", exec_name);
    println!("{} uds [uds path] [list file]", exec_name);
    println!("");
    println!("NAME: {}", env!("CARGO_PKG_NAME"));
    println!("VERSION: {}", env!("CARGO_PKG_VERSION"));
    println!("DESCRIPTION: {}", env!("CARGO_PKG_DESCRIPTION"));
    exit(exit_code);
}

fn main() {
    let args: Vec<String> = env::args().collect();
    let args_len = args.len();

    if args_len == 1 {
        help(0, &args)
    }

    if args[1] == "http" && args_len == 5 {
        let ip = &args[2];
        let port = args[3].parse::<u16>().unwrap();
        let fp: &Path = Path::new(&args[4]);
        if !fp.exists() {
            println!("'{}' file not found", &args[1]);
            exit(1);
        } else {
            let map = map::new(fp);
            let _ = server::start(server::ServerMode::HTTP { ip, port }, map);
        }
    } else if args[1] == "uds" && args_len == 4 {
        let uds_path: &Path = Path::new(&args[2]);
        let fp: &Path = Path::new(&args[3]);
        if !fp.exists() {
            println!("'{}' file not found", &args[1]);
            exit(1);
        } else {
            let map = map::new(fp);
            let _ = server::start(server::ServerMode::UDS { uds_path }, map);
        }
    } else {
        help(1, &args);
    }

    exit(0);
}

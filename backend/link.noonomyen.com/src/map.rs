use std::fs;
use std::path::Path;
use std::collections::HashMap;
use std::process::exit;

pub fn new(filename: &Path) -> HashMap<String, String> {
    let mut _list: HashMap<String, String> = HashMap::new();

    let raw: String;
    match fs::read_to_string(filename) {
        Ok(data) => { raw = data; }
        Err(error) => {
            eprintln!("error reading file: {}", error);
            exit(1);
        }
    }

    let mut ln: i32 = 0;
    for l in raw.split("\n") {
        ln += 1;
        if !(l.replace(" ", "").len() == 0) {
            let sl: Vec<&str> = l.split(" ").collect();
            if sl.len() == 2 && (sl[0] != "" && sl[1] != "") {
                _list.insert(sl[0].to_string(), sl[1].to_string());
            } else {
                println!("parse error at line: {}", ln);
            }
        }
    }

    println!("number of redirect link : {}", _list.len());

    return _list;
}

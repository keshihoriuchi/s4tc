# s4tc

HTTPS server invoked from command line for testing cert files by accessing browser.

## Usage

### Install

```
$ npm install -g s4tc
```

### Example

If you create self signed cert for `example.com` and want to test it,

```bash
openssl genrsa -out example.key 2048
openssl req -new -key example.key -out example.csr -subj '/CN=example.com'
openssl x509 -req -days 365 -in example.csr -signkey example.key -out example.crt
sudo echo "127.0.0.1 example.com" >> /etc/hosts
s4tc --cert test.crt --key test.key -p 10443
firefox https://example.com:10443 # install example.crt and check cert is green
```

### Options

```
  Usage: s4tc [options]


  Options:

    -V, --version      output the version number
    -c, --cert <path>  (required) cert file path
    -k, --key <path>   (required) key file path
    -p, --port         (optional) listening port number. default 443
    -h, --help         output usage information
```
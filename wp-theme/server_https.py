#!/usr/bin/env python3
"""
Simple HTTPS static file server for the project root.

This wraps Python's built-in http.server with an SSL socket so the process
accepts TLS connections (useful when a TCP-level TLS passthrough forwards
ClientHello bytes to the server).

It expects `cert.pem` and `key.pem` to live in the same directory; you can
generate them with openssl (the terminal commands used by the agent are in
the session). The server binds to 0.0.0.0:3000 by default.
"""
import http.server
import ssl
import socketserver
import os

PORT = 3000
HERE = os.path.dirname(__file__)
CERTFILE = os.path.join(HERE, "cert.pem")
KEYFILE = os.path.join(HERE, "key.pem")

class ReuseTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

def main():
    if not (os.path.exists(CERTFILE) and os.path.exists(KEYFILE)):
        raise SystemExit(
            f"Missing cert/key — please create `{CERTFILE}` and `{KEYFILE}` first."
        )

    Handler = http.server.SimpleHTTPRequestHandler
    with ReuseTCPServer(("", PORT), Handler) as httpd:
        print(f"Serving HTTPS on 0.0.0.0:{PORT}")
        # Wrap the existing socket with SSL using an SSLContext (recommended)
        context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        context.load_cert_chain(certfile=CERTFILE, keyfile=KEYFILE)
        httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Shutting down HTTPS server")

if __name__ == '__main__':
    main()

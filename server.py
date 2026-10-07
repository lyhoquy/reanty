from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).parent


class SiteHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    port = 8000
    print(f"Serving Reanty at http://0.0.0.0:{port}")
    print(f"Data server: http://0.0.0.0:{port}/data/stays.json")
    ThreadingHTTPServer(("0.0.0.0", port), SiteHandler).serve_forever()

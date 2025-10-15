TLS files (cert.pem / key.pem)
=================================

Purpose
-------
These files are a locally generated self-signed certificate (`cert.pem`) and
private key (`key.pem`) used only for local development inside this Codespace.
They allow the small `server_https.py` wrapper to accept TLS connections on
port 3000 so the Codespaces preview tunnel can successfully forward HTTPS.

Security and repository policy
-----------------------------
- These files are added to `.gitignore` and are intentionally NOT committed to
  the repository. Do not commit private keys to GitHub or any public repo.
- If you ever push these files to a remote, rotate/revoke them immediately and
  remove them from the repo history.

Regenerating the cert/key (local)
---------------------------------
From the project root, run (this creates `cert.pem` and `key.pem`):

```bash
openssl req -x509 -nodes -newkey rsa:2048 -sha256 -days 365 \
  -subj "/C=US/ST=State/L=City/O=Dev/CN=localhost" \
  -keyout key.pem -out cert.pem
```

Running the local HTTPS server
-----------------------------
Make sure `cert.pem` and `key.pem` live in the project root and then start
the simple HTTPS server (in background):

```bash
python3 server_https.py &> /tmp/olon-server-https.log &
```

You can check the server logs with:

```bash
tail -n 200 /tmp/olon-server-https.log
```

Removing the files locally
--------------------------
If you want to delete the files from this workspace:

```bash
rm -f cert.pem key.pem
```

If they were accidentally committed (you should avoid this), remove them from
the index and commit the change (do NOT do this unless they were actually
committed):

```bash
git rm --cached cert.pem key.pem
git commit -m "Remove local TLS files from repo and stop tracking"
git push
```

If they were pushed to a remote, assume compromise and rotate/recreate
credentials. Use git-filter-repo or BFG to remove them from history if needed.

Contact
-------
If you'd like, I can also delete these files from the workspace, or add a
startup task that regenerates them automatically when the Codespace starts.

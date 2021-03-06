#! /bin/bash

echo "Exporting Bear to Markdown Files..."
python3 ./src/markdown-exporter/bear_export_sync.py --skipImport --out ./notes --backup .
echo "Extracting Highlights..."
node ./src/highlight-extract.js
echo "Sending to Readwise..."
node ./src/send-to-readwise.js
echo "Done"

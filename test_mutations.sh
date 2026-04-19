for file in lib/data/*.js; do
  echo "Checking $file"
  grep -E "(\.push|\.splice|\.pop|\.shift|\.unshift|\.reverse|\.sort|\.fill|delete |\[.*\]\s*=|[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+\s*=)" "$file" | grep -v "module.exports" | grep -v "==="
done

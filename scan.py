import os
import re

print("SCANNING FOR MISSING TESTS")
source_dirs = ['lib', 'functions', 'script']
test_dir = 'tests'

sources = []
for d in source_dirs:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith('.js'):
                sources.append(os.path.join(root, f))

missing_tests = []
for src in sources:
    base = os.path.basename(src)
    test_file = base.replace('.js', '.test.js')
    test_path = os.path.join(test_dir, test_file)
    if not os.path.exists(test_path):
        missing_tests.append((src, test_path))

for src, test in missing_tests:
    print(f"Missing test for {src} -> {test}")

print("\nSCANNING FOR DOC DEPTH")
for root, _, files in os.walk('docs'):
    for f in files:
        if f.endswith('.md'):
            path = os.path.join(root, f)
            depth = len(path.split(os.sep))
            if depth > 3: # docs/topic/file.md is 3
                print(f"Doc too deep: {path}")

print("\nSCANNING FOR SECRETS")
os.system("grep -ri 'api_key' lib functions script")
os.system("grep -ri 'secret' lib functions script")

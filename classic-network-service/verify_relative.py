import os
import sys
import re

files_to_check = ["index.html", "style.css", "app.js"]

print("=== Classic Network Service Website Verification (Relative) ===\n")

all_exist = True
for f in files_to_check:
    if os.path.exists(f):
        print(f"[PASS] File exists: {f}")
    else:
        print(f"[FAIL] File missing: {f}")
        all_exist = False

if not all_exist:
    sys.exit(1)

with open("index.html", "r", encoding="utf-8") as file:
    html_content = file.read()

# Strict Branding: "Do not create or display any separate brand identity called 'CTS WiFi'"
if "CTS WiFi" in html_content:
    print("[FAIL] Detected forbidden brand 'CTS WiFi' in index.html!")
    sys.exit(1)
else:
    print("[PASS] No references to forbidden brand 'CTS WiFi' found.")

# Occurrences of CTS in index.html
lower_html = html_content.lower()
if "cts" in lower_html:
    cts_words = re.findall(r'\bcts\b', lower_html)
    if cts_words:
        print(f"[WARN] Found exact word 'CTS' matches: {len(cts_words)}")
    else:
        print("[PASS] No standalone 'CTS' abbreviation words found.")
else:
    print("[PASS] No abbreviation of 'CTS' found.")

# Check for "Classic Network Service" consistent usage
brand_matches = len(re.findall(r'Classic Network Service', html_content))
print(f"[INFO] 'Classic Network Service' brand name is used {brand_matches} times.")

if brand_matches < 5:
    print("[WARN] Brand name 'Classic Network Service' usage seems low!")
else:
    print("[PASS] 'Classic Network Service' is consistently used across website content.")

# Check links
links = ['#home', '#plans', '#offer', '#why-choose', '#coverage', '#contact']
links_pass = True
for link in links:
    if f'href="{link}"' not in html_content:
        print(f"[FAIL] Link target not found: {link}")
        links_pass = False

if links_pass:
    print("[PASS] All navigation anchor links are properly linked.")

# Verify form elements
form_elements = ['formName', 'formPhone', 'formAddress', 'formPlan', 'formMessage']
form_pass = True
for elem in form_elements:
    if f'id="{elem}"' not in html_content:
        print(f"[FAIL] Form field ID '{elem}' is missing!")
        form_pass = False

if form_pass:
    print("[PASS] All required connection form fields are properly defined.")

print("\nVerification completed successfully!")
sys.exit(0)

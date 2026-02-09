import os
import subprocess
import sys
import platform

# --- CONFIGURATION ---
# We list BOTH versions so you can pick the right one for your machine.
REPO_OPTIONS = [
    # Option 1: SSH (Best for Raspberry Pi / Linux / Mac)
    "git@github.com:sisqodataclub/ecomweb1.git",
    "git@github.com:sisqodataclub/project_3D.git",
    "git@github.com:sisqodataclub/backend.git",
    
    # Option 4: HTTPS (Best for Windows)
    "https://github.com/sisqodataclub/ecomweb1.git",
    "https://github.com/sisqodataclub/project_3D.git",
    "https://github.com/sisqodataclub/backend.git"
]

def clear_screen():
    # Clears terminal for both Windows (cls) and Linux (clear)
    os.system('cls' if os.name == 'nt' else 'clear')

def run_command(command, capture=False):
    try:
        # shell=True required for Windows to recognize commands like 'git'
        result = subprocess.run(command, check=True, shell=True,
                                capture_output=capture, text=True)
        return result.stdout.strip() if capture else None
    except subprocess.CalledProcessError as e:
        # We print errors but don't crash, allowing the script to try recovery (like remote set-url)
        if capture:
            return None
        print(f"⚠️  Note: Command '{command}' had a minor issue (might be normal).")

def get_repo_url():
    print("\n--- 🌐 SELECT REPOSITORY ---")
    print("Use SSH (git@...) for Raspberry Pi.")
    print("Use HTTPS (https://...) for Windows.\n")
    
    for i, url in enumerate(REPO_OPTIONS, 1):
        # Visual hint for user
        type_hint = "[SSH/Pi]" if "git@" in url else "[HTTPS/Win]"
        print(f"  {i}. {type_hint} {url}")
        
    print(f"  {len(REPO_OPTIONS) + 1}. Enter a custom URL")

    while True:
        choice = input("\nEnter choice number: ").strip()

        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(REPO_OPTIONS):
                return REPO_OPTIONS[idx]
            elif idx == len(REPO_OPTIONS):
                return input("🔗 Enter custom URL: ").strip()
        print("❌ Invalid selection.")

def main():
    clear_screen()
    print(f"💻 Detected System: {platform.system()}")
    
    folder_path = input("📁 Drag & Drop project folder here (or type path): ").strip()

    # 1. Fix Paths for Windows/Linux compatibility
    folder_path = os.path.expanduser(folder_path) # Fixes '~' on Linux
    folder_path = folder_path.replace('"', '').replace("'", "") # Fixes quotes from Drag & Drop
    
    # 2. Check if folder exists
    if not os.path.isdir(folder_path):
        print(f"\n❌ Error: Folder not found at:\n{folder_path}")
        return

    # 3. Navigate to folder
    os.chdir(folder_path)
    print(f"\n📂 Working in: {os.getcwd()}")

    # 4. Select Repo
    repo_url = get_repo_url()

    # 5. Git Operations
    print("\n⚙️  Initializing Git...")
    # Initialize if not already
    if not os.path.exists(".git"):
        run_command("git init")
    
    # Reset Remote (Force the script to use the URL you just picked)
    run_command("git remote remove origin", capture=True)
    run_command(f"git remote add origin {repo_url}")
    
    print("📦 Staging files...")
    run_command("git add .")

    # Check if there are changes to commit
    status = run_command("git status --porcelain", capture=True)
    if status:
        print("wq  Committing changes...")
        run_command('git commit -m "Universal Update Script"')
    else:
        print("⚠️  No new changes found (pushing anyway just in case)...")

    print(f"🚀 Pushing to {repo_url}...")
    run_command("git branch -M main")
    
    try:
        # We try to push. On Windows, this might trigger a login popup.
        subprocess.run("git push -u origin main", check=True, shell=True)
        print("\n✅ SUCCESS! Code is live on GitHub.")
    except subprocess.CalledProcessError:
        print("\n❌ Push Failed.")
        print("1. If on Windows: Did you close the login popup?")
        print("2. If on Pi: Did you select the SSH option?")
        print("3. Try running 'git pull origin main' first.")

if __name__ == "__main__":
    main()

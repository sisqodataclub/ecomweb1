import os
import subprocess
import sys

# --- CONFIGURATION ---
REPO_OPTIONS = [
    "https://github.com/sisqodataclub/ecomweb1.git",
    "https://github.com/sisqodataclub/project_3D.git",
    "https://github.com/sisqodataclub/backend.git"
]

def run_command(command, capture=False):
    try:
        # Use shell=True for windows compatibility with simple commands
        result = subprocess.run(command, check=True, shell=True, 
                                capture_output=capture, text=True)
        return result.stdout.strip() if capture else None
    except subprocess.CalledProcessError as e:
        print(f"❌ Error while running command: {command}")
        if e.stderr:
            print(e.stderr)
        print(e)
        sys.exit(1)

def check_case_mismatches(repo_url):
    print("🔍 Checking for case mismatches between local and GitHub...")

    # Get local tracked files
    try:
        local_files = run_command("git ls-files", capture=True).splitlines()
    except:
        local_files = []
        
    local_map = {f.lower(): f for f in local_files}

    # Fetch the remote tree
    try:
        run_command("git fetch origin main --depth=1")
        remote_files = run_command("git ls-tree -r origin/main --name-only", capture=True).splitlines()
    except:
        print("⚠️ Could not fetch remote tree (repo might be empty). Skipping case check.")
        return

    remote_map = {f.lower(): f for f in remote_files}

    mismatches = []
    for key in set(local_map.keys()).intersection(remote_map.keys()):
        if local_map[key] != remote_map[key]:
            mismatches.append((local_map[key], remote_map[key]))

    if mismatches:
        print("❌ Case mismatches detected between local and GitHub:")
        for local, remote in mismatches:
            print(f"   Local: {local}   <>   Remote: {remote}")
        print("\n👉 Please rename the file locally to match GitHub exactly, e.g.:")
        print("   git mv login.jsx Login.jsx")
        sys.exit(1)

    print("✅ No case mismatches between local and GitHub.\n")

def get_repo_url():
    print("\nSelect a GitHub Repository:")
    for i, url in enumerate(REPO_OPTIONS, 1):
        print(f"  {i}. {url}")
    print(f"  {len(REPO_OPTIONS) + 1}. Enter a custom URL")

    while True:
        choice = input("\nEnter the number of your choice: ").strip()
        
        if choice.isdigit():
            idx = int(choice) - 1
            if 0 <= idx < len(REPO_OPTIONS):
                return REPO_OPTIONS[idx]
            elif idx == len(REPO_OPTIONS):
                custom_url = input("🔗 Enter your GitHub repository URL (HTTPS): ").strip()
                if custom_url.startswith("https://github.com/"):
                    return custom_url
                else:
                    print("❌ Invalid URL. Must start with https://github.com/")
        
        print("❌ Invalid selection. Please try again.")

def main():
    folder_path = input("📁 Enter the full path to your project folder: ").strip()
    
    # Remove quotes if user copied path as "C:\Path"
    folder_path = folder_path.replace('"', '').replace("'", "")
    
    if not os.path.isdir(folder_path):
        print("❌ That path does not exist or is not a folder.")
        return

    repo_url = get_repo_url()
    
    os.chdir(folder_path)
    print(f"\n📂 Changed directory to: {folder_path}")
    print(f"🔗 Targeted Repo: {repo_url}\n")

    # Git Commands
    commands_setup = [
        "git init",
        "git remote remove origin || echo 'No existing origin to remove'",
        f"git remote add origin {repo_url}",
        "git add ."
    ]
    
    for command in commands_setup:
        run_command(command)

    # Check case mismatches before commit (requires fetch, so must occur after remote add)
    check_case_mismatches(repo_url)

    status_result = run_command("git status --porcelain", capture=True)
    if status_result and status_result.strip():
        run_command('git commit -m "Automated update via script"')
    else:
        print("⚠️ No changes to commit.")

    push_commands = [
        "git branch -M main",
        "git push -u origin main --force"
    ]
    
    print("🚀 Pushing to GitHub...")
    for command in push_commands:
        run_command(command)

    print("\n✅ Project folder successfully pushed to GitHub!")

if __name__ == "__main__":
    main()
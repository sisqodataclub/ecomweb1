import re
import sys

file_path = './projects/ecomweb1/frontend/app/routes/about.tsx'
with open(file_path, 'r') as f:
    content = f.read()

# 1. Add data-theme-color='obsidian' to the article element
# Find the article opening tag
pattern = r'(<article\s+)(ref=\{containerRef\}\s+className="[^"]*")([^>]*)'
# We'll replace with added attribute
def repl(match):
    before = match.group(1)
    middle = match.group(2)
    after = match.group(3)
    # Ensure we don't duplicate attribute
    if 'data-theme-color' in after:
        return match.group(0)
    return f'{before}{middle} data-theme-color="obsidian"{after}'

new_content = re.sub(pattern, repl, content, count=1, flags=re.DOTALL)

# 2. Add contact section before the closing </article>
# Find the closing </article> tag
contact_section = '''
      {/* --- 7. CONTACT SECTION --- */}
      <section className="py-20 bg-obsidian-bg/50 border-t border-obsidian-primary/20" aria-label="Contact">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-6 text-obsidian-text">Get in Touch</h3>
          <p className="text-obsidian-subtext mb-8 max-w-md mx-auto">
            For inquiries, collaborations, or feedback, feel free to reach out.
          </p>
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-obsidian-bg border border-obsidian-primary/30 rounded-lg hover:border-obsidian-primary transition-colors duration-300">
            <span className="text-obsidian-text font-mono text-lg">fd92uk@gmail.com</span>
            <svg className="w-5 h-5 text-obsidian-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </section>
'''

# Insert contact section before the closing </article>
# We need to find the last </article> tag (there should be only one)
# We'll replace '</article>' with contact_section + '</article>'
# But careful not to replace any nested </article> (none).
# We'll do a simple replacement from the end.
last_article_close = new_content.rfind('</article>')
if last_article_close != -1:
    new_content = new_content[:last_article_close] + contact_section + new_content[last_article_close:]
else:
    print('Error: Could not find closing </article> tag')
    sys.exit(1)

# Write back
with open(file_path, 'w') as f:
    f.write(new_content)

print('Successfully modified about.tsx')

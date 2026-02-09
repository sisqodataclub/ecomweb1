import re
with open('frontend/app/components/landing/MonolithLayout.tsx', 'r') as f:
    data = f.read()
# Pattern to match the button with its inner content
pattern = r'<button\s+className=\{`([^`]*?)\`\s*>(.*?)</button>'
# Find the specific button with Shop Now
# We'll do a more targeted replacement
# First, locate the button containing "Shop Now"
if 'Shop Now' in data:
    # Split by lines to make it easier
    lines = data.split('\n')
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if 'Shop Now' in line and '<button' in lines[i-1]:
            # We need to find the start of the button
            # Go backwards to find the button opening tag
            for j in range(i-1, max(i-10, -1), -1):
                if '<button' in lines[j]:
                    start = j
                    # Find the closing button tag
                    for k in range(i, min(i+10, len(lines))):
                        if '</button>' in lines[k]:
                            end = k
                            # Replace the button with Link
                            # Combine lines from start to end
                            button_block = '\n'.join(lines[start:end+1])
                            # Replace <button with <Link to="/products"
                            # Keep the className and everything else
                            new_block = button_block.replace('<button', '<Link to="/products"')
                            new_block = new_block.replace('</button>', '</Link>')
                            new_lines.append(new_block)
                            i = end + 1
                            break
                    break
            else:
                new_lines.append(line)
                i += 1
        else:
            new_lines.append(line)
            i += 1
    new_data = '\n'.join(new_lines)
    if new_data != data:
        with open('frontend/app/components/landing/MonolithLayout.tsx', 'w') as f:
            f.write(new_data)
        print('Button replaced with Link')
    else:
        print('No replacement made')
else:
    print('Shop Now not found')

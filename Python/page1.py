import os
import warnings

warnings.filterwarnings('ignore')
def SummarizeSection():
    INPUT_FILE = "./data/content.txt"
    OUTPUT_FILE = "./data/Page.txt"

    if os.path.exists(OUTPUT_FILE):
        os.remove(OUTPUT_FILE)

    with open(OUTPUT_FILE, 'w+', encoding='utf-8') as page:
        try:
            with open(INPUT_FILE, "r", encoding='utf-8') as f:
                print(f"Reading content from {INPUT_FILE}...")
                while True:
                    line = f.readline()

                    if not line or line.strip() == '---------PAGE 2--------':
                        break
                    else:
                        page.write(line.strip() + '\n')

        except FileNotFoundError:
            print(f"Error: The input file '{INPUT_FILE}' was not found.")

        page.seek(0)

        content_read = page.readlines()

        content_read = [x for x in content_read if x!='\n']

        author = content_read[2].split(',') # Name of authors list
        if author[0].__contains__('[PLAIN_TEXT]'):
            temp = author[0]
            author[0] = temp[13:]
        
        return content_read
    
con= SummarizeSection()
print(len(con))
for line in con:
    print(f"{line}\n")        
        
        





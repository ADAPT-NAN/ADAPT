# Editing the ADAPT-Nan website: research pages and learning media

This guide is for project members who update the text of the nine research pages (for example https://adapt-nan.github.io/ADAPT/#study/2-3) in English and Thai, and add resources to the Learning media page. Everything is done in a web browser on GitHub; nothing needs to be installed.

## Before you start

- You need a GitHub account with write access to https://github.com/ADAPT-NAN/ADAPT. Ask the website maintainer to add you.
- Every saved change is published to the website automatically, about one minute later.
- Each change is kept in the history, so any mistake can be undone (see "Undoing a change").

## Where the text lives

| What you see on the website | File to edit |
|---|---|
| English title, card summary, and paragraphs of a research page | `website/content/data.js` |
| Thai title, card summary, and paragraphs of a research page | `website/content/th.js` |
| Resources on the Learning media page | `website/content/media.js` |

In both `data.js` and `th.js`, the nine research topics appear in the same order: 1.1, 1.2, 1.3, 2.1, 2.2, 2.3, 3.1, 3.2, 3.3. In `data.js` each topic starts with its number, for example `"number": "2.3"`. In `th.js` the topics have no number, so count them in order (the sixth entry is 2.3).

A research topic looks like this:

```js
{
  "id": "2-3",
  "short": "Young talents",
  "number": "2.3",
  "group": 2,
  "title": "La-on Nan – Sensitizing the youth to biodiversity values",
  "paragraphs": [
    "First paragraph of the page…",
    "Second paragraph of the page…"
  ]
},
```

- `title`: the page title, also used on the Research page and in the publication outline.
- `paragraphs`: the text of the page. Each paragraph is one line in quotation marks. The research card shows the first sentence of the first paragraph.
- `summary` (optional): a short text for the research card instead of the first sentence.
- `short`: the label of the topic button on the Learning media page.
- Do not change `id`, `number`, or `group`.

## Step by step: change the text of a research page

1. Open the file on GitHub, for example https://github.com/ADAPT-NAN/ADAPT/blob/main/website/content/data.js
2. Click the pencil icon (**Edit this file**) at the top right of the file.
3. Use **Ctrl+F** (Windows) or **Cmd+F** (Mac) to find the topic, for example `"number": "2.3"`.
4. Change the text **between the quotation marks** only.
5. Click **Commit changes…**, write a short description such as "Update 2.3 text", choose **Commit directly to the main branch**, and click **Commit changes**.
6. Repeat in `website/content/th.js` for the Thai version of the same topic.
7. After about one minute, open the page (for example https://adapt-nan.github.io/ADAPT/#study/2-3), press **Cmd+Shift+R** / **Ctrl+Shift+R** to reload, and check both EN and ไทย.

## Rules that keep the website working

- Keep the quotation marks `"` at the start and end of every text.
- Inside a text, use typographic quotes “ ” instead of straight quotes `"`.
- Paragraphs are separated by a comma at the end of the line. The last paragraph has **no** comma after it.
- To add a paragraph, copy a whole line (including its quotation marks and comma) and change the text.
- To remove a paragraph, delete the whole line, then check the commas.

## Adding a resource to the Learning media page

1. Upload the PDF and a picture: on GitHub, open the folder `website/assets/docs/` (for files) or `website/assets/media/` (for pictures), click **Add file → Upload files**, and commit.
2. Open `website/content/media.js`, click the pencil icon, copy one whole entry `{ … },` and change it:
   - `title`, `place`, `summary`: the text shown on the card (English)
   - `type`: Video, Article, Book, Report, or Brochure
   - `topics`: the research topics it relates to, for example `["2-1", "3-1"]`
   - `image`: the picture, for example `"media/my-picture.jpg"`
   - `link`: the file (`"assets/docs/my-report.pdf"`) or a web address such as a YouTube video
   - `linkLabel`: for example `"Open PDF"` or `"Watch on YouTube"`
3. Add the Thai title, place, and summary to `website/content/translations.js`, in the same form as the other lines: `"English text": "ข้อความภาษาไทย",`

## Undoing a change

If a page looks wrong or empty after a change, a quotation mark or comma is usually missing. Open the file on GitHub, click **History**, open your last change, and click **Revert** (or ask the maintainer). The previous version is published again within a minute.

## Training session (about one hour)

1. Tour of the files above and how pages map to them (10 min)
2. Edit an English paragraph of one research page together and publish it (15 min)
3. Make the matching Thai change and check both languages (10 min)
4. Add a resource to Learning media (15 min)
5. Undo a change from the history (10 min)

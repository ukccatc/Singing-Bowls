# Черновики статей: "Поющие чаши" (по книге Евы Руди Янсен)

Источник: Ева Руди Янсен, «Поющие чаши. Практическое руководство по применению»
(рус. изд., "ДИЛЯ") — использована как фактологическая основа, дополнена
общими знаниями о звуковом исцелении и медитации.

Каждая статья лежит в отдельном файле `NN-slug.md` и содержит версии
на трёх языках (EN / RU / UK) плюс короткие метаданные (категория, теги)
для последующего переноса на сайт.

Категории соответствуют enum ArticleCategory в lib/types.ts:
CULTURE, SOUND_HEALING, TUTORIALS, MEDITATION, WELLNESS.

## Часть 1. История и культура (01-05, 12, 21-24)
- [x] 01 — What Are Singing Bowls? A Complete Beginner's Guide — CULTURE
- [x] 02 — East Meets West: How Singing Bowls Reached the Modern World — CULTURE
- [x] 03 — The Secretive Masters of Sound — CULTURE
- [x] 04 — Ringing Stones and Fountain Bowls — CULTURE
- [x] 05 — From Chalices to Singing Bowls — CULTURE
- [x] 12 — Seven Metals, Seven Planets — CULTURE
- [x] 21 — Tingsha Explained — CULTURE
- [x] 22 — Meteoric Metal: The Legend of "Sky Iron" — CULTURE
- [x] 23 — Bells and Dorje — CULTURE
- [x] 24 — The Four Noble Truths Behind the Bell and Dorje — CULTURE

## Часть 2. Наука звука (06-11)
- [x] 06 — Sound as a Universal Language — WELLNESS
- [x] 07 — Sound Is Form: Cymatics — SOUND_HEALING
- [x] 08 — Why Every Singing Bowl Sounds Different — TUTORIALS
- [x] 09 — Natural Harmony — SOUND_HEALING
- [x] 10 — Synchronization — SOUND_HEALING
- [x] 11 — Shamanism and Brainwaves — SOUND_HEALING

## Часть 3. Практика (13-20)
- [x] 13 — How to Choose Your Singing Bowl — TUTORIALS
- [x] 14 — Trust Your Intuition — TUTORIALS
- [x] 15 — Striking vs Rimming — TUTORIALS
- [x] 16 — Essential Mallets and Strikers — TUTORIALS
- [x] 17 — Signposts in a Magic Land — MEDITATION
- [x] 18 — The Art of Listening — MEDITATION
- [x] 19 — Open Heart, Open Mind — MEDITATION
- [x] 20 — Therapeutic Applications — SOUND_HEALING

## Часть 4. Уход, wellness и разное (25-30)
- [x] 25 — Antique vs Modern Singing Bowls — TUTORIALS
- [x] 26 — Singing Bowls for Meditation: Building a Daily Practice — MEDITATION
- [x] 27 — Singing Bowls for Yoga — WELLNESS
- [x] 28 — Chakra Balancing with Singing Bowls — WELLNESS
- [x] 29 — How to Clean and Care for Your Singing Bowl — TUTORIALS
- [x] 30 — Creating a Home Sound Sanctuary — WELLNESS

Статус: **все 30 статей готовы** (3364 строк суммарно).

**Общий файл:** `ALL-ARTICLES.md` — все 30 статей в одном документе (~3500 строк, ~481 KB).
**DOCX:** `ALL-ARTICLES.docx` — та же коллекция в формате Word с оглавлением и стилями заголовков (~197 KB).
**Промежуточный MD для DOCX:** `ALL-ARTICLES-for-docx.md` — версия, оптимизированная для pandoc.

## Как использовать

1. **Все сразу:** откройте `ALL-ARTICLES.md` или `ALL-ARTICLES.docx` — полная коллекция в одном файле
2. **По одной:** откройте нужный файл `NN-slug.md`
3. Скопируйте секцию EN / RU / UK в блог
4. Метаданные `category` и `tags` — для `lib/data/articles.ts`
5. При публикации на сайт: перенести в TypeScript-формат Article

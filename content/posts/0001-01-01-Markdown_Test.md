+++
date = '0001-01-01T14:23:00-04:00'
draft = true
toc = true
title = 'Markdown Test'
+++

## Headers

### Header h3
#### Header h4
##### Header h5
###### Header h6

## Formatting

### Text

**Bold with asterisks**

__Bold with underscores__

*Italics with asterisks*

_Italics with underscores_

***Bold and Italics with asterisks***

___Bold and Italics with underscores___

~~Strikethrough with tilde~~

### Links

[Named link](https://www.google.com/ "Named Link")

Explicit Link: <https://www.google.com/>

[Reference Link With Name][ref link]

[Reference Link Without Name] will do the same as well. It works as the identifier itself.

[ref link]: https://jamstack.club (Reference Link With Name)
[reference link without name]: https://roneo.org/markdown (Reference Link Without Name)

## Lists

### Unordered

Tabs with 2 spaces are enough.
- Item 1
  - Sub Item 1
    - Sub Sub Item 1
- Item 2
- Item 3

### Ordered

Tabs with 4 spaces are needed.
1. Item 1
    1. Sub Item 1
        1. Sub Sub Item 1
1. Item 2
1. Item 3

### Tasks

- [x] Task 1
  - [x] Sub Task 1
- [ ] Task 2
  - [ ] Sub Task 2

## Blockquotes

> ### This is a header 3.
> #### This is a header 4.
> ##### This is a header 5.
> ###### This is a header 6.
> 
> 1.   This is the first list item.
> 2.   This is the second list item.
>
> > Nested blockquote
> > > Sub Nested blockquote
> 
> Here's some example code:
> 
> ```cs { title="Test" }
> public Vector3 GetSomeVector()
> {
>     return new Vector3(1.0f, 0.0f, 1.0f);
> }
> ```

## Code

### Blocks of code

```cs { hl_lines=[5 "16-19"] }
using UnityEngine;

namespace MOB.MarkdownTest
{
    [Serializable]
    public struct Sphere
    {
        public float3 Position;
        public float Radius;
    }

    public class SphereBehaviour : MonoBehaviour
    {
        [SerializeField] private Sphere _sphere;

        public void Awake()
        {
           //Do Something
        }
    }
}
```

### Inline code

Single characters `+` or longer strings `something like this`

## Horizontal Lines

Use either `***`, `---` or `___`
***
---
___

## Images

Standard image with link:

[![This is an alt text.](/img/N_Sphere_256.webp "This is a sample image.")](https://www.google.com/)

Image with identifier:

![Semantic desc.][image identifier]

[image identifier]: /img/N_Sphere_256.webp "Title"

## Tables

| Syntax    | Description |   Test Text |
| :-------- | :---------: | ----------: |
| Header    |    Title    | Here's this |
| Paragraph |    Text     |    And more |

## Footnotes

Here's a sentence with a footnote[^1].
[^1]: This is the first footnote.

Here's a longer one[^bignote].
[^bignote]: Here's one with multiple paragraphs and code.
	
	Indent paragraphs to include them in the footnote.
	
	`{ my code }`
	
	Note that you can place the footnote anywhere you want in your article
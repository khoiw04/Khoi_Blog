---
title: 'How I Rice My Window for Productivity'
description: 'I use a combination of tools and configurations to optimize my productivity in a Windows environment.'
pubDate: 'Feb 17 2026'
heroImage: 'public/imgs/pngs/how-i-rice-my-window-for-productivity/card_preview.png'
collection: en
tags: [".dotfiles", "Share"]
---

* "Convinient, Instant, Fast!"
* "I want to conclude my setup!"

> These are the reasons the article exists.
*Note: My config theme is [here](https://github.com/khoiw04/cinnamon-theme)*

---

## My rules to optimize my productivity
- **Instant:** No animation = No delay.
- **Shortcut:** More shortcuts I have, The faster I am.
- **Mica:** I can see what happening behind the window. 
- **Clean:** I don't want to see any unnecessary things.

## My utils
**Core:**
  - [Zen Browser](https://blog.khoiwn04.com/go/zen): The Browser which having a lot of shortcuts.
  - [Zed Editor](https://blog.khoiwn04.com/go/zed): The Editor which supports Mica and Vim.
  - [GlazeWM](https://blog.khoiwn04.com/go/glazewm): The Titling Window Manager which doing instantly.
  - [Flow Launcher](https://blog.khoiwn04.com/go/flow): The fast and powerful replacement of Start Menu.
  
**Decoration:**
  - [MicaForEveryone](https://blog.khoiwn04.com/go/mica): Make everything Mica
  - [F.lux](https://blog.khoiwn04.com/go/flux): Make my screen comfortable
  - [TranslucentTB](https://blog.khoiwn04.com/go/translucent): Make my taskbar transparent
  - [tacky-border](https://blog.khoiwn04.com/go/tacky): Make my accent border 
  - [AutoHotkey](https://blog.khoiwn04.com/go/autohotkey): Make the wallpaper replacement

---

## My tips
### **My Zen Browser**
![My Zen Browser](/imgs/pngs/how-i-rice-my-window-for-productivity/ignite.png)

I hide sidebars and toolbars, I only use shortcuts to navigate the web and open the extensions.
- `Alt + Q`: [Search tab bar](https://blog.khoiwn04.com/go/zen-tab-search)
- `Cmd + T`: Create new tab or extension
- `Cmd + Shift + T`: Reopen closed tab
- `Cmd + W`: Close current window
- `Cmd + L`: Change the current link
- `Cmd + Shift + D`: Pin the current tab
- `Cmd + S`: Show the sidebar
- `Cmd + Shift + S`: Toggle the sidebar
- `Cmd + Alt + H or V`: Split horizontally or vertically
- ...

::wide[![](/imgs/pngs/how-i-rice-my-window-for-productivity/zen-mod.png)]
![I use mods to boost my view](/imgs/pngs/how-i-rice-my-window-for-productivity/zen-transparent.png)

:::full
Đây là nội dung sẽ chiếm toàn bộ chiều rộng trình duyệt.
Nó cực kỳ hợp với phong cách "Zen" tràn viền của bạn.
:::

### **My tacky-border**
![Before tacky-border](/imgs/pngs/how-i-rice-my-window-for-productivity/before-tacky-border.png)
![After tacky-border](/imgs/pngs/how-i-rice-my-window-for-productivity/after-tacky-border.png)

![I use Task Scheduler to startup tacky-border as administrator](/imgs/pngs/how-i-rice-my-window-for-productivity/task-scheduler.png)

> **Some applications like Discord, Zed Editor, Exploders, etc.* need rights to access the border.

Here is my config to change the border color:
```yaml
  active_color:
    colors: ["accent", "accent"]
    direction: 45deg

  inactive_color:
    colors: ["#404040", "#404040"]
    direction:
      start: [0.0, 1.0]
      end: [1.0, 0.0]

```

Here is my config to handle window rules:
```yaml
  - match: Process
    name: "Discord"
    strategy: Equals
    enabled: True
    follow_native_border: False

  - match: Process
    name: "Zen"
    strategy: Equals
    enabled: true
    follow_native_border: false

  - match: Title
    name: "Task Manager"
    strategy: Contains
    enabled: True
    follow_native_border: False

  - match: Process
    name: "Zed"
    strategy: Equals
    enabled: True
    follow_native_border: False

  - match: Process
    name: "GlazeWM"
    strategy: Equals
    enabled: True

  - match: Process
    name: "GlazeWM Watcher"
    strategy: Equals
    enabled: True
```

:::warning[Result]
I use the tacky-border to make my accent border visible.
:::

### **My script to change wallpaper quickly**

![Change Wallpaper](/imgs/pngs/how-i-rice-my-window-for-productivity/change-wallpaper.webp)

It takes two days to make the script by asking the Gemini. Painful!

Here is [the script](https://blog.khoiwn04.com/go/scripts/wallhotkey.ahk) can do:
- `Cmd + '`: Change wallpaper 
- `Cmd + Shift + '`: Change previous wallpaper 
- `Cmd + Shift + S` Change wallpaper with randomness
- `Cmd + Shift + D` Change wallpaper with dual monitor
- Sync the focus's border color to the accent color
- Sync the text selection & text indicator to the accent color

:::warning[Bug]
It still has the bug that text indicator can't turn off by using `Win + Cmd + Alt + I` but you can manually turn it off.
:::

### **The accent color**

Here is my window's setting

![Don't turn this one on, it can make Zen Browser looks ugly](/imgs/pngs/how-i-rice-my-window-for-productivity/window-setting.png)


## Done
Here is all my settings to boost productivity. Thanks for reading ^^!

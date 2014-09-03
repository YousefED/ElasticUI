## 0.0.5 (2014-09-3)
- Aggregations are now dynamic which means you can change aggregations and they will be updated automatically (just like filters etc.) fixes #9
- eui-search-error event. Thanks to @mathroc! 
- add eui-host directive to select eui host at runtime

## 0.0.4 (2014-07-21)
Added support for highlighting. Thanks to @mathroc!  

## 0.0.3 (2014-07-14)
- sorting.enabled is now being watched and can be dynamically updated (not just on start)

## 0.0.2 (2014-07-09)
- Fix for "Update index dynamically #1" - makes euiIndex more in sync with other directives

**Upgrading:**
- Fix for #1 breaks existing code, update your codebase by changing euiIndex="indexname" to euiIndex="'indexname'"

## 0.0.1 (2014-06-20)

Initial release

# Common Issues

## NDK Version issue

1. Go to file `android/build.gradle`
1. Change `ndkVersion` to **25.1.8937393**

## weak_ptr or cmake related issues

Do the changes mentioned in this [commit](https://github.com/expo/expo/pull/29075)

## App crash on due to some svg error

### Error

```sh
java.lang.NumberFormatException: For input string: "none"
  jdk.internal.math.FloatingDecimal.readJavaFormatString(FloatingDecimal.java:2054)
  jdk.internal.math.FloatingDecimal.parseDouble(FloatingDecimal.java:110)
  java.lang.Double.parseDouble(Double.java:660)
  java.lang.Double.valueOf(Double.java:623)
  com.horcrux.svg.PropHelper.fromRelative(PropHelper.java:133)
  com.horcrux.svg.FontData.toAbsolute(FontData.java:142)
  com.horcrux.svg.FontData.<init>(FontData.java:165)
  com.horcrux.svg.GlyphContext.pushNodeAndFont(GlyphContext.java:170)
  com.horcrux.svg.GlyphContext.pushContext(GlyphContext.java:177)
  com.horcrux.svg.GroupView.pushGlyphContext(GroupView.java:76)
  com.horcrux.svg.GroupView.drawGroup(GroupView.java:91)
  com.horcrux.svg.GroupView.draw(GroupView.java:86)
  com.horcrux.svg.RenderableView.render(RenderableView.java:398)
  com.horcrux.svg.GroupView.drawGroup(GroupView.java:111)
  com.horcrux.svg.GroupView.draw(GroupView.java:86)
  com.horcrux.svg.RenderableView.render(RenderableView.java:398)
  com.horcrux.svg.SvgView.drawChildren(SvgView.java:316)
  com.horcrux.svg.SvgView.drawOutput(SvgView.java:268)
  com.horcrux.svg.SvgView.onDraw(SvgView.java:130)
.......
```

### Fix

This is due to a faulty SVG file in your assets. The svg is using `none` is attributes somewhere in its code. Try commenting out imported SVG's one by one & you would find the error causing svg.

Just remove the svg from you assets or fix the `none` attributes

### Reference

https://github.com/software-mansion/react-native-svg/issues/1061

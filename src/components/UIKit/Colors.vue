<template>
  <div>
    <div class="text-h1 ui__title">COLORS</div>

    <div class="text-h3">MAIN</div>
    <div class="colors__block colors__block_main">
      <div>primary</div>
      <div>secondary</div>
      <div>background</div>
      <div>light</div>
      <div>dark</div>
      <div>black</div>
      <div>medium-blue</div>
      <div>dark-blue</div>
    </div>

    <div class="text-h3">MAP COLOR</div>
    <div class="colors__block colors__block_map">
      <div>map-pale-purple</div>
      <div>map-pink-antique</div>
      <div>map-purplish-red</div>
      <div>map-dark-peach</div>
      <div>map-light-blue</div>
      <div>map-shiny-blue</div>
      <div>map-dark-azure</div>
      <div>map-midnight-blue</div>
      <div>map-greenish-blue</div>
      <div>map-very-light-green</div>
      <div>map-bluish-green</div>
      <div>map-moderate-green</div>
      <div>map-light-green</div>
      <div>map-pale-green</div>
      <div>map-green-fern</div>
      <div>map-violet-blue</div>
      <div>map-pale-blue</div>
      <div>map-slate-gray</div>
      <div>map-tele-gray</div>
      <div>map-gentian-blue</div>
      <div>map-dusty-blue</div>
      <div>map-green-jungle</div>
      <div>map-yellow-click</div>
    </div>

    <div class="text-h3">SERVICE</div>
    <div class="colors__block colors__block_service">
      <div>green</div>
      <div>orange</div>
      <div>red</div>
    </div>

    <div class="text-h3">ILLUSTRATIONS</div>
    <div class="colors__block colors__block_illustrations">
      <div>illustration-light</div>
      <div>illustration-light-blue</div>
      <div>illustration-light-gray</div>
      <div>illustration-blue</div>
      <div>illustration-dark-blue</div>
      <div>illustration-white</div>
      <div>illustration-gray</div>
      <div>illustration-dark-gray</div>
      <div>illustration-dark-gray-plus</div>
      <div>illustration-black</div>
      <div>illustration-skin</div>
      <div>illustration-dark-skin</div>
      <div>illustration-pink</div>
    </div>

    <div class="text-h3">DARK THEME</div>
    <div class="colors__block colors__block_dark">
      <div>dark-theme-light</div>
      <div>dark-theme-medium</div>
      <div>dark-theme-dark</div>
      <div>dark-theme-black</div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
.colors__block
  display grid
  grid-template-columns repeat(4, 1fr)
  margin 10px 0

  > div
    height 60px
    text-align center
    line-height 60px

.colors__block_main
  > :nth-child(1)
    background-color $primary

  > :nth-child(2)
    background-color $secondary

  > :nth-child(3)
    background-color $background

  > :nth-child(4)
    background-color $light

  > :nth-child(5)
    background-color $dark

  > :nth-child(6)
    background-color $grey

  > :nth-child(7)
    background-color $medium-blue

  > :nth-child(8)
    background-color $dark-blue

.colors__block_map
  > :nth-child(1)
    background-color $map-pale-purple

  > :nth-child(2)
    background-color $map-pink-antique

  > :nth-child(3)
    background-color $map-purplish-red

  > :nth-child(4)
    background-color $map-dark-peach

  > :nth-child(5)
    background-color $map-light-blue

  > :nth-child(6)
    background-color $map-shiny-blue

  > :nth-child(7)
    background-color $map-dark-azure

  > :nth-child(8)
    background-color $map-midnight-blue

  > :nth-child(9)
    background-color $map-greenish-blue

  > :nth-child(10)
    background-color $map-very-light-green

  > :nth-child(11)
    background-color $map-bluish-green

  > :nth-child(12)
    background-color $map-moderate-green

  > :nth-child(13)
    background-color $map-light-green

  > :nth-child(14)
    background-color $map-pale-green

  > :nth-child(15)
    background-color $map-green-fern

  > :nth-child(16)
    background-color $map-violet-blue

  > :nth-child(17)
    background-color $map-pale-blue

  > :nth-child(18)
    background-color $map-slate-gray

  > :nth-child(19)
    background-color $map-tele-gray

  > :nth-child(20)
    background-color $map-gentian-blue

  > :nth-child(21)
    background-color $map-dusty-blue

  > :nth-child(22)
    background-color $map-green-jungle

  > :nth-child(23)
    background-color $map-yellow-click

.colors__block_service
  > :nth-child(1)
    background-color $green

  > :nth-child(2)
    background-color $orange

  > :nth-child(3)
    background-color $red

.colors__block_illustrations
  > :nth-child(1)
    background-color $illustration-light

  > :nth-child(2)
    background-color $illustration-light-blue

  > :nth-child(3)
    background-color $illustration-light-gray

  > :nth-child(4)
    background-color $illustration-blue

  > :nth-child(5)
    background-color $illustration-dark-blue

  > :nth-child(6)
    background-color $illustration-white

  > :nth-child(7)
    background-color $illustration-gray

  > :nth-child(8)
    background-color $illustration-dark-gray

  > :nth-child(9)
    background-color $illustration-dark-gray-plus

  > :nth-child(10)
    background-color $illustration-black

  > :nth-child(11)
    background-color $illustration-skin

  > :nth-child(12)
    background-color $illustration-dark-skin

  > :nth-child(13)
    background-color $illustration-pink

.colors__block_dark
  > :nth-child(1)
    background-color $dark-theme-light

  > :nth-child(2)
    background-color $dark-theme-medium

  > :nth-child(3)
    background-color $dark-theme-dark

  > :nth-child(4)
    background-color $dark-theme-black
</style>

<template lang="pug">
  q-card.q-pa-lg
    q-card-section
      .text-subtitle
        | {{value.number}}. {{value.name}}
    q-card-section
      div(v-html="value.content" v-if="value.content")
</template>

<script>
  export default {
    name: "SubSection",
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    }
  };
</script>

<style lang="stylus">
  .design-code-subsection__image
    display: flex
    width 100%
    padding: 0.6rem

    img
      max-width: 100%
      min-width: 25%
      align-self: flex-start

  .design-code-subsection__card
    box-shadow: 0 0 8px rgba(40, 47, 60, 0.15)
    border-radius: 4px
    padding: 1rem 2rem
    margin: 2rem 0
    height: 100%

  .card__text-container
    padding: 0 1rem
    flex-basis: 50%

  .card__text-item, .subsection__column
    flex-basis: 48%
    margin: 1rem .4rem

  .card__text
    margin: 1rem 0

    &--header
      font-weight: 600

  .card__list
    list-style-type: "– "

    li
      margin: .8rem 0

    ol
      li
        margin: .4rem 0

  .subsection__ol
    list-style-type: decimal-leading-zero

  .card__table, .table
    text-align: left
    border-spacing: 0

    &__headers
      color: rgba(51, 51, 51, 0.5)

    tr
      td, th
        padding: 2rem 2rem 2rem 0

        &:not(:first-child)
          padding-left: 2rem

  .table-elements
    border-collapse: collapse

    tr:not(:last-child)
      border-bottom: 1px solid #C0C8CF

    th
      font-weight: normal
      padding: 1rem 1rem

    .icon-check
      border-radius: 50%
      background-color: #EEF7FF
      display: flex
      justify-content: center
      align-items: center
      padding: .8rem

  .card__images-container
    display: flex
    flex-direction: column

  .icon-dash
    min-width: 12px
    max-width: 12px
    height: 2px
    margin: 0 .8rem

  .icon-ellipse
    min-width: 12px
    max-width: 12px
    height: 12px
    border-radius: 50%
    margin: 0 .8rem

  .text--red
    color: #9A525E

  .text--green
    color: #679186
</style>

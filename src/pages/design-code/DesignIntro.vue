<template lang="pug">
  .design-intro.full-width.full-height.bg-blue
    .row.q-pa-xl.relative-position.design-intro__top
      img.design-intro__top-image(src="@/assets/svg/houses.svg")
      .col-12.col-md-6.z-fab
        div
          .design-intro__header.text-primary.q-mb-lg
            | Дизайн код
          div.design-intro__caption-medium.text-wrap
            | Дизайн-код - это свод принципов и правил, направленных на создание стилистически единой, комфортной и безопасной городской среды.
    .row.q-pa-xl.bg-white.design-intro__sections.items-center
      .col-12.col-md-6.items-center.justify-center.flex
        img.design-intro__sections-image(src="@/assets/svg/benches.svg")
      .col-12.col-md-6
        .column
          .design-intro__subtitle.q-mb-md
            | Разделы
          q-list
            q-item(v-for="(section, index) in sectionsList" :key="index").q-pl-none
              q-item-section(avatar).q-pr-none
                .design-intro__bullet
              q-item-section.design-intro__caption-medium
                | {{ section }}
      .col-12.q-mt-lg
        .design-intro__subtitle.q-mb-md
          | Для чего городу нужен Дизайн-код?
        .row.q-col-gutter-md
          .col-12.col-md-6.col-lg-3(v-for="(card, index) in cards" :key="index")
            q-card.fit
              q-card-section
                q-icon(:name="card.icon" size="xl" color="primary-light")
              q-card-section.design-intro__caption-medium
                | {{card.caption}}
    .row.q-pa-xl.design-intro__who.relative-position
      img(src="@/assets/svg/peoplegroup.svg").design-intro__who-image
      .col-12.col-md-6.z-fab
        .column
          .design-intro__subtitle.q-mb-md
            | Для кого?
          q-list
            q-item(v-for="(item, index) in forWho" :key="index").q-pl-none
              q-item-section(avatar).q-pr-none
                .design-intro__bullet
              q-item-section.design-intro__caption-medium
                | {{ item }}
    .row.q-pa-xl.bg-white.items-start.q-col-gutter-md
      .col-12.col-md-3
        .design-intro__subtitle
          | Как создавался Дизайн-код?
      .col-12.col-md-9.design-intro__caption-medium
        | Над созданием Дизайн-кода города Иннополис работала команда архитекторов, урбанистов, дизайнеров, специалистов по транспортному планированию и геоинформационному анализу.
        | <br><br>Разработка Дизайн-кода осуществлялась в соответствии с результатами натурного обследования территории города Иннополис, анализа российского и зарубежного опыта создания дизайн-кодов и руководств по проектированию качественной городской среды.
        | <br><br>Дизайн-код подготовлен в соответствии с действующими федеральными законами и нормативными актами, постановлениями Верхнеуслонского муниципального района и внутренними документами города Иннополис. Входит в систему документов территориального планирования, развития и благоустройства территории.
    .q-pa-xl
      .design-intro__subtitle.q-mb-xl
        | Как работать с  Дизайн-кодом?
      q-timeline
        q-timeline-entry(v-for="(entry, index) in timeline" :key="index" :title="entry.title")
          .div(v-if="entry.caption")
            | {{entry.caption}}
</template>

<script>
  export default {
    name: "DesignIntro",
    computed: {
      timeline () {
        return [
          {
            title: "Постановка задачи",
            caption: "Намерение реализовать проект на территории города Иннополис."
          },
          {
            title: "Определение места реализации проекта",
            caption: "Выбор территории, сбор и предоставление подробной информации об участке размещения и планируемом расположении на нем объекта."
          },
          {
            title: "Обращение к Дизайн-коду",
            caption: "Учет всех принципов, правил и рекомендаций, адресованных планируемому объекту."
          },
          {
            title: "Разработка дизайн-проекта с учетом положений Дизайн-кода",
            caption: "Учет всех принципов, правил и рекомендаций, адресованных планируемому объекту."
          },
          {
            title: "Согласование дизайн-проекта с органом местного самоуправления города Иннополис"
          },
          {
            title: "Реализация проекта и поддержание надлежащего состояния объекта на стадии эксплуатации"
          }
        ];
      },
      forWho () {
        return [
          "Местное самоуправление города Иннополис",
          "Строительные компании",
          "Управляющие компании и подрядные организации по благоустройству города",
          "Представители бизнеса и стрит-ритейла",
          "Местные жители"
        ];
      },
      cards () {
        return [
          {
            caption: "Унифицировать информационные и рекламные сообщения",
            icon: "o_article"
          },
          {
            caption: "Создать комфортные и современные общественные пространства",
            icon: "o_favorite_border"
          },
          {
            caption: "Создать удобную и понятную систему навигации",
            icon: "o_near_me"
          },
          {
            caption: "Сохранить и развить идентичность города",
            icon: "o_fingerprint"
          }
        ];
      },
      sectionsList () {
        return [
          "Информационные конструкции",
          "Рекламные конструкции",
          "Система навигации",
          "Входные группы",
          "Малые архитектурные формы ",
          "Сезонные кафе и нестационарные торговые объекты",
          "Праздничное и событийное оформление города "
        ];
      }
    }
  };
</script>

<style lang="stylus">
  .design-intro {
    &__header {
      font-weight 600
      font-size 32px
    }

    &__caption-medium {
      font-size 20px
    }

    &__bullet {
      background $primary
      width 16px
      height 16px
      border-radius 50%
    }

    &__subtitle {
      font-size 24px
    }

    &__caption-medium {
      font-size 20px
    }

    &__top {
      min-height 446px
    }

    &__top-image {
      position absolute
      bottom 0
      right 5%
      max-width 70%
    }

    &__who-image {
      position: absolute;
      top 0
      overflow hidden
      right 0
      max-height 90%
    }

    &__sections-image {
      min-width 90%
    }
  }

  @media (max-width: $breakpoint-md-min) {
    .design-intro__who-image {
      display none
    }
  }
</style>

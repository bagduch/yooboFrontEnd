<template>

  <div>
    <title-bar :title-stack="['Admin Setting']"/>
    <section class="section is-main-section">
      <card-component class="has-table has-mobile-sort-spaced">


        <div class="columns">
          <div class="column is-two-fifths">
            <div class="admin-menu">
              <nav class="panel">
                <p class="panel-heading">
                  Repositories
                </p>
                <div class="panel-block">
                  <p class="control has-icons-left">
                    <input class="input" type="text" placeholder="Search">
                    <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
                  </p>
                </div>
                <p class="panel-tabs">
                  <a class="is-active">All</a>
                  <a>Public</a>
                  <a>Private</a>
                  <a>Sources</a>
                  <a>Forks</a>
                </p>
                <a class="panel-block is-active">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
                  bulma
                </a>
                <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
                  marksheet
                </a>
                <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
                  minireset.css
                </a>
                <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
    </span>
                  jgthms.github.io
                </a>
                <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-code-branch" aria-hidden="true"></i>
    </span>
                  daniellowtw/infboard
                </a>
                <a class="panel-block">
    <span class="panel-icon">
      <i class="fas fa-code-branch" aria-hidden="true"></i>
    </span>
                  mojs
                </a>
                <label class="panel-block">
                  <input type="checkbox">
                  remember me
                </label>
                <div class="panel-block">
                  <button class="button is-link is-outlined is-fullwidth">
                    Reset all filters
                  </button>
                </div>
              </nav>
            </div>
          </div>
          <div class="column">Auto</div>
        </div>
      </card-component>

    </section>
  </div>

</template>

<script>
    import CardComponent from '@/components/CardComponent'
    import ModalBox from '@/components/ModalBox'
    import TitleBar from '@/components/TitleBar'
    import HeroBar from '@/components/HeroBar'
    import CardToolbar from '@/components/CardToolbar'
    import ModalTrashBox from '@/components/ModalTrashBox'
    import NewClientModal from '@/components/Client/NewClientModal'
    import ViewTable from '@/components/Client/ViewTable'
    import ViewGrid from '@/components/Client/ViewGrid'


    export default {
        name: "AdminIndex",
        components: {
            ModalTrashBox,
            CardToolbar,
            HeroBar,
            TitleBar,
            ModalBox,
            CardComponent,
        }
    }

</script>

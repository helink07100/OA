import Vue from 'vue'
import LayoutPage from '@/components/layout_page'
import PageCard from '@/components/page/card'
import PageTableList from '@/components/page/table_list'
import PageEmpty from '@/components/page/empty'

export default function({ app }) {
  Vue.component(LayoutPage.name, LayoutPage)
  Vue.component(PageCard.name, PageCard)
  Vue.component(PageTableList.name, PageTableList)
  Vue.component(PageEmpty.name, PageEmpty)
}

import {
  // create naive ui
  create,
  // component
  NSpace,
  NStatistic,
  NTimeline,
  NTimelineItem,
  NCard,
  NScrollbar,
  NModal
} from 'naive-ui'

export function setupNaiveUI(app) {

    const naive = create({
        components: [
            NSpace,
            NStatistic,
            NTimeline,
            NTimelineItem,
            NCard,
            NScrollbar,
            NModal
        ]
    })

    app.use(naive)
}

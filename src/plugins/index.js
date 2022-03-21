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
  NModal,
  NButton,
  NSelect,
  NSpin,
  NDrawer,
  NDrawerContent,
  NForm,
  NFormItemGi,
  NGrid,
  NSlider,
  NSwitch,
    NInput,
    NDatePicker,
    NInputNumber,
    NAlert,
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
            NModal,
            NButton,
            NSelect,
            NSpin,
            NDrawer,
            NDrawerContent,
            NForm,
            NFormItemGi,
            NGrid,
            NSlider,
            NDatePicker,
            NInput,
            NSwitch,
            NInputNumber,
            NAlert
        ]
    })

    app.use(naive)
}

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
  NDatePicker,
    NInput,
    NTimePicker,
    NDataTable,
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
            NTimePicker,
            NDataTable,
            NInput,
            NSwitch,
            NInputNumber,
            NAlert
        ]
    })

    app.use(naive)
}

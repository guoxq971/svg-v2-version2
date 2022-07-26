<template>
  <div>
    <el-button @click="prod.mode = 'edit'">点击1</el-button>
    <el-button @click="prod.mode = 'preview'">点击2</el-button>
    <svg
      height="544"
      version="1.1"
      width="544"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      style="border: 1px dotted green"
    >
      <defs>
        <clipPath :id="prodMode.preview" test="[预览模式]-d1">
          <path :d="prod.previewD1"></path>
        </clipPath>
        <clipPath :id="prodMode.edit" test="[编辑模式]-d2">
          <path :d="prod.editD2"></path>
        </clipPath>
      </defs>
      <path
        test="[编辑模式]边框红色虚线path"
        :style="{
          strokeDasharray: 5,
          display: displayByMode(prod.editBdRedPath.type),
        }"
        fill="#ffffff"
        stroke="#ff0000"
        :d="prod.editBdRedPath.d"
        :transform="prod.editBdRedPath.transform"
      ></path>
      <image
        test="[预览模式]背景图"
        :href="prod.previewBgImage.href"
        :x="prod.previewBgImage.x"
        :y="prod.previewBgImage.y"
        :width="prod.previewBgImage.width"
        :height="prod.previewBgImage.height"
        :style="{ display: displayByMode(prod.previewBgImage.type) }"
      ></image>
      <g test="设计图-组合" :transform="prod.designGroup.transform">
        <rect
          test="设计图组合rect"
          :x="prod.designGroup.rect.x"
          :y="prod.designGroup.rect.y"
          :width="prod.designGroup.rect.width"
          :height="prod.designGroup.rect.height"
          fill="none"
          style=""
        ></rect>
        <rect
          test="设计图组合rect"
          :x="prod.designGroup.rect.x"
          :y="prod.designGroup.rect.y"
          :width="prod.designGroup.rect.width"
          :height="prod.designGroup.rect.height"
          fill="none"
          :style="{ clipPath: `url(#${prod.mode})` }"
        ></rect>
        <g test="设计图最外层g" type="设计图">
          <g
            test="设计图的边框的边框-clip"
            :style="{ clipPath: `url(#${prod.mode})` }"
          >
            <g
              test="设计图的边框"
              style="cursor: move"
              transform="matrix(1,0,0,1,110,250)"
            >
              <image
                test="设计图"
                bm="edit"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARVBMVEUAAAAAAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP7///9b/nNZAAAAFXRSTlMAAAIcIw4NtOfkWMljx/xiBUJUUyCwsZuvAAAAAWJLR0QWfNGoGQAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAAd0SU1FB+YGFQgGJfcDIksAAAGPSURBVHja7dDHEcJAAAAxcs7g/lulBr8W5qQStFgAAAAAAAAAAAAAAAAAAAAAAADwo5ar9WZU2+XcrN3+cBzUaXbW9jyN6iJLlqyaLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZL1M1nX6Tao++ysx/P1HtRnbhYAAAAA8Oe+tguDipqSmkoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDYtMjFUMDg6MDY6MzYrMDA6MDB/BjTEAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA2LTIxVDA4OjA2OjM2KzAwOjAwDluMeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="
                x="0"
                y="0"
                width="100"
                height="100"
                style="cursor: move; overflow: hidden"
              ></image>
            </g>
          </g>
          <g
            test="编辑的边框"
            style="display: none"
            transform="matrix(1,0,0,1,110,250)"
          >
            <rect
              test="编辑的矩形"
              x="0"
              y="0"
              width="100"
              height="100"
              stroke="#000000"
              fill="none"
              style=""
            ></rect>
            <image
              test="编辑移动"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA0lBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19/f39dXV38/Px+fn4AAABbW1v7+/tYWFgPDw9WVlb6+vpUVFT5+fl9fX1RUVH4+Ph8fHxPT0/39/cQEBABAQFMTEx7e3tKSkr19fV6enoODg5ISEhFRUXz8/NDQ0Py8vJBQUHx8fF4eHg+Pj48PDzw8PDl5eXv7+/m5uagoKCenp7u7u41NTVmmCopAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8UlEQVQoz23Q2VLCQBAF0MvqwmpGIyANDIIYIosZEEnAKOj//5LTVWQGUjkPt253vzWQyxfuUgr5HFAsOeI+RTilIsrOQwanjCv3MYO4RstO7bbtLXSeEl2irhk66PVP9F5fkqmHQd+Q0vYBhs+GlLYPMRqzFw4pTR2PMHnVPOKUkpM8zgmmvu97RG/abMZJ5OnVFHMhxOLysNCrOZbvWkCcSnFSwLnEymUBh1KmuiusPwylbF9j82koZfsG2/Ak4pdEybTFLjy7mH24w/7LiCLb97iJvzP83KJyyDocKqjWjvFvSnysVYF6o/mX0mzU8Q875FlKui96zAAAAABJRU5ErkJggg=="
              x="-18"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑旋转"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABX1BMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/Pzo6Oh+fn4uLi4HBwcGBgYqKip3d3fl5eVbW1v7+/u1tbUSEhIAAAAICAgxMTEzMzMMDAynp6dYWFi0tLQEBASKiorw8PDz8/OYmJgPDw8BAQFWVlb6+vrv7+8ZGRkKCgrCwsLPz8/h4eFUVFT5+fmRkZGAgICVlZV0dHRRUVH4+PhEREQDAwPx8fEsLCxPT0/39/fJycnGxsYcHBwWFhbu7u5MTEz19fVKSkp2dnY/Pz9ISEhkZGQrKyvm5uaSkpJycnJFRUXe3t4ODg4LCwva2tpDQ0Py8vKpqamIiIjp6enq6uqUlJSgoKBBQUHk5OQaGhoJCQkyMjKampo+Pj56enpwcHA8PDyenp41NTV1I7FBAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABN0lEQVQoz23J6TsCURgF8LfV0mqGFqRMcdUVSpvQQlFN0UJEabEVEeX/f9yZO5/mmd+H895zD4BKrVmS0ahVAFodwy7LsIxOC3pmRQGjhzmbXQE7Dw67Igc4VyVr664Nt2eTo80JXh+1tY12/AGM8K5YvRCk/3v7+CDk84UPI1FxCUIsLkgcJY/FR/wkgk/JiUEqLcigbFpyhs5JpiCXF1xccnlJARdJ5qDE83y5cnVdqVR5KuAmUYIay7IZRATrLBXAJGrQqBM3CN0m6lQVF0k2oGkT3N23bJIH9EiyCe2wINQJS8pP3R45begPJM8vr4PB23skOhRaH0YF6uMTjf1fXdT9FusIJtJQ6Py4kmPPb4+2CUxDiqawwCUUtBbBMFQahgYwmmZcVYabmYwAZov1T8ZqMcM/0Mxz3GjPMWoAAAAASUVORK5CYII="
              x="100"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑缩放"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA1VBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/PwAAABKSkpbW1v7+/tLS0v19fVYWFgWFhbx8fFWVlb6+voVFRVSUlJUVFT5+fnv7+9RUVH4+Pjy8vLz8/NPT0/39/djY2NMTExiYmLw8PBJSUlISEhQUFDq6upFRUXu7u4UFBRDQ0Po6OhBQUHr6+s+Pj48PDzl5eXm5uagoKCenp41NTVutcKlAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA9klEQVQoz23Q6VLCMBQF4MPqwmqjZbmlFgsUmhYQoRVElgq+/yOZOEIzNd9MJif3/LoBcvnCQ0YhnwOKJYM9ZjCjVETZeNIwyrgxWxrsFu2WVhudrkCSxbqpDnq2IOfPjq3oof9XvLjq3O5jMBSIRuSxoWKA8UQgy/fIcyapMXggWGEwFY0ZXHHM5oIrTshfnXB+McOCXbjmGw/FvZSPBSznyuXEXcdfyWwhMlN+TPH7imSMsJ4qNjF9EMm0xjZUfY7ErjJssXMV+0h+jkw7HP7Nf4sDjkutI+4SX+PrHpWTrjhVUK2dk01Gcq5VgXqj+Z3RbNTxA1TOTngb3xHTAAAAAElFTkSuQmCC"
              x="100"
              y="100"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑删除"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX195eXkBAQEAAABdXV38/PxKSkqysrJbW1v7+/tJSUkREREFBQUMDAxYWFja2tpWVlb6+voKCgpTU1NUVFT5+fnGxsZOTk6mpqbHx8dRUVH4+Ph1dXWDg4P39/fCwsLe3t7Z2dnDw8NPT090dHTb29seHh4fHx/Nzc1MTEyCgoIdHR3Ly8v19fVzc3PY2NjKyspISEiBgYHX19fJyclFRUXz8/NycnLW1tbIyMhDQ0Py8vKAgIAcHBxBQUHx8fF+fn7t7e2qqqrOzs6xsbE+Pj6YmJg8PDzj4+M7Ozvw8PDs7OxZWVnl5eXv7+/m5uagoKCenp7u7u41NTUwGSPSAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABQ0lEQVQoz23JV1PCQBQF4Eu1UE00AqFJAiKiKE0RVGAlCgqhSVEpCijo/393bwZmGCbfwzl3zwJotLq9DTqtBkBvYNj9DSxj0IOROVDBGGGLO1TBboNjdTtdPO9yrl4OcHuWvD6Px+ddvdzgP6ICgiCIQUEIivQI4OKHEBZ/vIbHJQThEypyuiaCSxiiZ9R5LHSxFIpd4hKFeAIlU+mrxHUmccOlksoQh2wa5VK3d+lULn2fp4GyUGBRrpghbDHHkgcaqADeEpKKj6RUlErkiQbyQplDUuWZcBWJIy80UBmqNSRX6qRWkWukQQNVodlCcrv+2mrLLdKggZrQ6SK513/rvue7H/2erAwdGCg9HI2V7o4/h0oPYPSFJlORV4jTiTKMYGf2reJnF0xztY+5CcyWxex3w2xhMQNYbfa/DXabFf4BuK96ZClD1l4AAAAASUVORK5CYII="
              x="-18"
              y="100"
              width="18"
              height="18"
            ></image>
          </g>
        </g>
        <g test="设计图最外层g" type="设计图">
          <g
            test="设计图的边框的边框-clip"
            :style="{ clipPath: `url(#${prod.mode})` }"
          >
            <g
              test="设计图的边框"
              style="cursor: move"
              transform="matrix(1,0,0,1,111,176)"
            >
              <image
                test="设计图"
                bm="edit"
                href="/img/pic_2.8bbd7a19.png"
                x="0"
                y="0"
                width="100"
                height="100"
                style="cursor: move; overflow: hidden"
              ></image>
            </g>
          </g>
          <g
            test="编辑的边框"
            style="display: none"
            transform="matrix(1,0,0,1,111,176)"
          >
            <rect
              test="编辑的矩形"
              x="0"
              y="0"
              width="100"
              height="100"
              stroke="#000000"
              fill="none"
              style=""
            ></rect>
            <image
              test="编辑移动"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA0lBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19/f39dXV38/Px+fn4AAABbW1v7+/tYWFgPDw9WVlb6+vpUVFT5+fl9fX1RUVH4+Ph8fHxPT0/39/cQEBABAQFMTEx7e3tKSkr19fV6enoODg5ISEhFRUXz8/NDQ0Py8vJBQUHx8fF4eHg+Pj48PDzw8PDl5eXv7+/m5uagoKCenp7u7u41NTVmmCopAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8UlEQVQoz23Q2VLCQBAF0MvqwmpGIyANDIIYIosZEEnAKOj//5LTVWQGUjkPt253vzWQyxfuUgr5HFAsOeI+RTilIsrOQwanjCv3MYO4RstO7bbtLXSeEl2irhk66PVP9F5fkqmHQd+Q0vYBhs+GlLYPMRqzFw4pTR2PMHnVPOKUkpM8zgmmvu97RG/abMZJ5OnVFHMhxOLysNCrOZbvWkCcSnFSwLnEymUBh1KmuiusPwylbF9j82koZfsG2/Ak4pdEybTFLjy7mH24w/7LiCLb97iJvzP83KJyyDocKqjWjvFvSnysVYF6o/mX0mzU8Q875FlKui96zAAAAABJRU5ErkJggg=="
              x="-18"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑旋转"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABX1BMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/Pzo6Oh+fn4uLi4HBwcGBgYqKip3d3fl5eVbW1v7+/u1tbUSEhIAAAAICAgxMTEzMzMMDAynp6dYWFi0tLQEBASKiorw8PDz8/OYmJgPDw8BAQFWVlb6+vrv7+8ZGRkKCgrCwsLPz8/h4eFUVFT5+fmRkZGAgICVlZV0dHRRUVH4+PhEREQDAwPx8fEsLCxPT0/39/fJycnGxsYcHBwWFhbu7u5MTEz19fVKSkp2dnY/Pz9ISEhkZGQrKyvm5uaSkpJycnJFRUXe3t4ODg4LCwva2tpDQ0Py8vKpqamIiIjp6enq6uqUlJSgoKBBQUHk5OQaGhoJCQkyMjKampo+Pj56enpwcHA8PDyenp41NTV1I7FBAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABN0lEQVQoz23J6TsCURgF8LfV0mqGFqRMcdUVSpvQQlFN0UJEabEVEeX/f9yZO5/mmd+H895zD4BKrVmS0ahVAFodwy7LsIxOC3pmRQGjhzmbXQE7Dw67Igc4VyVr664Nt2eTo80JXh+1tY12/AGM8K5YvRCk/3v7+CDk84UPI1FxCUIsLkgcJY/FR/wkgk/JiUEqLcigbFpyhs5JpiCXF1xccnlJARdJ5qDE83y5cnVdqVR5KuAmUYIay7IZRATrLBXAJGrQqBM3CN0m6lQVF0k2oGkT3N23bJIH9EiyCe2wINQJS8pP3R45begPJM8vr4PB23skOhRaH0YF6uMTjf1fXdT9FusIJtJQ6Py4kmPPb4+2CUxDiqawwCUUtBbBMFQahgYwmmZcVYabmYwAZov1T8ZqMcM/0Mxz3GjPMWoAAAAASUVORK5CYII="
              x="100"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑缩放"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA1VBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/PwAAABKSkpbW1v7+/tLS0v19fVYWFgWFhbx8fFWVlb6+voVFRVSUlJUVFT5+fnv7+9RUVH4+Pjy8vLz8/NPT0/39/djY2NMTExiYmLw8PBJSUlISEhQUFDq6upFRUXu7u4UFBRDQ0Po6OhBQUHr6+s+Pj48PDzl5eXm5uagoKCenp41NTVutcKlAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA9klEQVQoz23Q6VLCMBQF4MPqwmqjZbmlFgsUmhYQoRVElgq+/yOZOEIzNd9MJif3/LoBcvnCQ0YhnwOKJYM9ZjCjVETZeNIwyrgxWxrsFu2WVhudrkCSxbqpDnq2IOfPjq3oof9XvLjq3O5jMBSIRuSxoWKA8UQgy/fIcyapMXggWGEwFY0ZXHHM5oIrTshfnXB+McOCXbjmGw/FvZSPBSznyuXEXcdfyWwhMlN+TPH7imSMsJ4qNjF9EMm0xjZUfY7ErjJssXMV+0h+jkw7HP7Nf4sDjkutI+4SX+PrHpWTrjhVUK2dk01Gcq5VgXqj+Z3RbNTxA1TOTngb3xHTAAAAAElFTkSuQmCC"
              x="100"
              y="100"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑删除"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX195eXkBAQEAAABdXV38/PxKSkqysrJbW1v7+/tJSUkREREFBQUMDAxYWFja2tpWVlb6+voKCgpTU1NUVFT5+fnGxsZOTk6mpqbHx8dRUVH4+Ph1dXWDg4P39/fCwsLe3t7Z2dnDw8NPT090dHTb29seHh4fHx/Nzc1MTEyCgoIdHR3Ly8v19fVzc3PY2NjKyspISEiBgYHX19fJyclFRUXz8/NycnLW1tbIyMhDQ0Py8vKAgIAcHBxBQUHx8fF+fn7t7e2qqqrOzs6xsbE+Pj6YmJg8PDzj4+M7Ozvw8PDs7OxZWVnl5eXv7+/m5uagoKCenp7u7u41NTUwGSPSAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABQ0lEQVQoz23JV1PCQBQF4Eu1UE00AqFJAiKiKE0RVGAlCgqhSVEpCijo/393bwZmGCbfwzl3zwJotLq9DTqtBkBvYNj9DSxj0IOROVDBGGGLO1TBboNjdTtdPO9yrl4OcHuWvD6Px+ddvdzgP6ICgiCIQUEIivQI4OKHEBZ/vIbHJQThEypyuiaCSxiiZ9R5LHSxFIpd4hKFeAIlU+mrxHUmccOlksoQh2wa5VK3d+lULn2fp4GyUGBRrpghbDHHkgcaqADeEpKKj6RUlErkiQbyQplDUuWZcBWJIy80UBmqNSRX6qRWkWukQQNVodlCcrv+2mrLLdKggZrQ6SK513/rvue7H/2erAwdGCg9HI2V7o4/h0oPYPSFJlORV4jTiTKMYGf2reJnF0xztY+5CcyWxex3w2xhMQNYbfa/DXabFf4BuK96ZClD1l4AAAAASUVORK5CYII="
              x="-18"
              y="100"
              width="18"
              height="18"
            ></image>
          </g>
        </g>
        <g test="设计图最外层g" type="设计图" active="这个是激活的">
          <g
            test="设计图的边框的边框-clip"
            :style="{ clipPath: `url(#${prod.mode})` }"
          >
            <g
              test="设计图的边框"
              style="cursor: move"
              transform="matrix(1,0,0,1,184,132)"
            >
              <image
                test="设计图"
                bm="edit"
                href="/img/pic_2.8bbd7a19.png"
                x="0"
                y="0"
                width="100"
                height="100"
                style="cursor: move; overflow: hidden"
              ></image>
            </g>
          </g>
          <g
            test="编辑的边框"
            style="display: none"
            transform="matrix(1,0,0,1,184,132)"
          >
            <rect
              test="编辑的矩形"
              x="0"
              y="0"
              width="100"
              height="100"
              stroke="#000000"
              fill="none"
              style=""
            ></rect>
            <image
              test="编辑移动"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA0lBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19/f39dXV38/Px+fn4AAABbW1v7+/tYWFgPDw9WVlb6+vpUVFT5+fl9fX1RUVH4+Ph8fHxPT0/39/cQEBABAQFMTEx7e3tKSkr19fV6enoODg5ISEhFRUXz8/NDQ0Py8vJBQUHx8fF4eHg+Pj48PDzw8PDl5eXv7+/m5uagoKCenp7u7u41NTVmmCopAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8UlEQVQoz23Q2VLCQBAF0MvqwmpGIyANDIIYIosZEEnAKOj//5LTVWQGUjkPt253vzWQyxfuUgr5HFAsOeI+RTilIsrOQwanjCv3MYO4RstO7bbtLXSeEl2irhk66PVP9F5fkqmHQd+Q0vYBhs+GlLYPMRqzFw4pTR2PMHnVPOKUkpM8zgmmvu97RG/abMZJ5OnVFHMhxOLysNCrOZbvWkCcSnFSwLnEymUBh1KmuiusPwylbF9j82koZfsG2/Ak4pdEybTFLjy7mH24w/7LiCLb97iJvzP83KJyyDocKqjWjvFvSnysVYF6o/mX0mzU8Q875FlKui96zAAAAABJRU5ErkJggg=="
              x="-18"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑旋转"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABX1BMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/Pzo6Oh+fn4uLi4HBwcGBgYqKip3d3fl5eVbW1v7+/u1tbUSEhIAAAAICAgxMTEzMzMMDAynp6dYWFi0tLQEBASKiorw8PDz8/OYmJgPDw8BAQFWVlb6+vrv7+8ZGRkKCgrCwsLPz8/h4eFUVFT5+fmRkZGAgICVlZV0dHRRUVH4+PhEREQDAwPx8fEsLCxPT0/39/fJycnGxsYcHBwWFhbu7u5MTEz19fVKSkp2dnY/Pz9ISEhkZGQrKyvm5uaSkpJycnJFRUXe3t4ODg4LCwva2tpDQ0Py8vKpqamIiIjp6enq6uqUlJSgoKBBQUHk5OQaGhoJCQkyMjKampo+Pj56enpwcHA8PDyenp41NTV1I7FBAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABN0lEQVQoz23J6TsCURgF8LfV0mqGFqRMcdUVSpvQQlFN0UJEabEVEeX/f9yZO5/mmd+H895zD4BKrVmS0ahVAFodwy7LsIxOC3pmRQGjhzmbXQE7Dw67Igc4VyVr664Nt2eTo80JXh+1tY12/AGM8K5YvRCk/3v7+CDk84UPI1FxCUIsLkgcJY/FR/wkgk/JiUEqLcigbFpyhs5JpiCXF1xccnlJARdJ5qDE83y5cnVdqVR5KuAmUYIay7IZRATrLBXAJGrQqBM3CN0m6lQVF0k2oGkT3N23bJIH9EiyCe2wINQJS8pP3R45begPJM8vr4PB23skOhRaH0YF6uMTjf1fXdT9FusIJtJQ6Py4kmPPb4+2CUxDiqawwCUUtBbBMFQahgYwmmZcVYabmYwAZov1T8ZqMcM/0Mxz3GjPMWoAAAAASUVORK5CYII="
              x="100"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑缩放"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA1VBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/PwAAABKSkpbW1v7+/tLS0v19fVYWFgWFhbx8fFWVlb6+voVFRVSUlJUVFT5+fnv7+9RUVH4+Pjy8vLz8/NPT0/39/djY2NMTExiYmLw8PBJSUlISEhQUFDq6upFRUXu7u4UFBRDQ0Po6OhBQUHr6+s+Pj48PDzl5eXm5uagoKCenp41NTVutcKlAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA9klEQVQoz23Q6VLCMBQF4MPqwmqjZbmlFgsUmhYQoRVElgq+/yOZOEIzNd9MJif3/LoBcvnCQ0YhnwOKJYM9ZjCjVETZeNIwyrgxWxrsFu2WVhudrkCSxbqpDnq2IOfPjq3oof9XvLjq3O5jMBSIRuSxoWKA8UQgy/fIcyapMXggWGEwFY0ZXHHM5oIrTshfnXB+McOCXbjmGw/FvZSPBSznyuXEXcdfyWwhMlN+TPH7imSMsJ4qNjF9EMm0xjZUfY7ErjJssXMV+0h+jkw7HP7Nf4sDjkutI+4SX+PrHpWTrjhVUK2dk01Gcq5VgXqj+Z3RbNTxA1TOTngb3xHTAAAAAElFTkSuQmCC"
              x="100"
              y="100"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑删除"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX195eXkBAQEAAABdXV38/PxKSkqysrJbW1v7+/tJSUkREREFBQUMDAxYWFja2tpWVlb6+voKCgpTU1NUVFT5+fnGxsZOTk6mpqbHx8dRUVH4+Ph1dXWDg4P39/fCwsLe3t7Z2dnDw8NPT090dHTb29seHh4fHx/Nzc1MTEyCgoIdHR3Ly8v19fVzc3PY2NjKyspISEiBgYHX19fJyclFRUXz8/NycnLW1tbIyMhDQ0Py8vKAgIAcHBxBQUHx8fF+fn7t7e2qqqrOzs6xsbE+Pj6YmJg8PDzj4+M7Ozvw8PDs7OxZWVnl5eXv7+/m5uagoKCenp7u7u41NTUwGSPSAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABQ0lEQVQoz23JV1PCQBQF4Eu1UE00AqFJAiKiKE0RVGAlCgqhSVEpCijo/393bwZmGCbfwzl3zwJotLq9DTqtBkBvYNj9DSxj0IOROVDBGGGLO1TBboNjdTtdPO9yrl4OcHuWvD6Px+ddvdzgP6ICgiCIQUEIivQI4OKHEBZ/vIbHJQThEypyuiaCSxiiZ9R5LHSxFIpd4hKFeAIlU+mrxHUmccOlksoQh2wa5VK3d+lULn2fp4GyUGBRrpghbDHHkgcaqADeEpKKj6RUlErkiQbyQplDUuWZcBWJIy80UBmqNSRX6qRWkWukQQNVodlCcrv+2mrLLdKggZrQ6SK513/rvue7H/2erAwdGCg9HI2V7o4/h0oPYPSFJlORV4jTiTKMYGf2reJnF0xztY+5CcyWxex3w2xhMQNYbfa/DXabFf4BuK96ZClD1l4AAAAASUVORK5CYII="
              x="-18"
              y="100"
              width="18"
              height="18"
            ></image>
          </g>
        </g>
        <g test="设计图最外层g" type="设计图">
          <g
            test="设计图的边框的边框-clip"
            :style="{ clipPath: `url(#${prod.mode})` }"
          >
            <g
              test="设计图的边框"
              style="cursor: move"
              transform="matrix(1,0,0,1,203,246)"
            >
              <image
                test="设计图"
                bm="edit"
                href="/img/pic_2.8bbd7a19.png"
                x="0"
                y="0"
                width="100"
                height="100"
                style="cursor: move; overflow: hidden"
              ></image>
            </g>
          </g>
          <g
            test="编辑的边框"
            style="display: none"
            transform="matrix(1,0,0,1,203,246)"
          >
            <rect
              test="编辑的矩形"
              x="0"
              y="0"
              width="100"
              height="100"
              stroke="#000000"
              fill="none"
              style=""
            ></rect>
            <image
              test="编辑移动"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA0lBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19/f39dXV38/Px+fn4AAABbW1v7+/tYWFgPDw9WVlb6+vpUVFT5+fl9fX1RUVH4+Ph8fHxPT0/39/cQEBABAQFMTEx7e3tKSkr19fV6enoODg5ISEhFRUXz8/NDQ0Py8vJBQUHx8fF4eHg+Pj48PDzw8PDl5eXv7+/m5uagoKCenp7u7u41NTVmmCopAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8UlEQVQoz23Q2VLCQBAF0MvqwmpGIyANDIIYIosZEEnAKOj//5LTVWQGUjkPt253vzWQyxfuUgr5HFAsOeI+RTilIsrOQwanjCv3MYO4RstO7bbtLXSeEl2irhk66PVP9F5fkqmHQd+Q0vYBhs+GlLYPMRqzFw4pTR2PMHnVPOKUkpM8zgmmvu97RG/abMZJ5OnVFHMhxOLysNCrOZbvWkCcSnFSwLnEymUBh1KmuiusPwylbF9j82koZfsG2/Ak4pdEybTFLjy7mH24w/7LiCLb97iJvzP83KJyyDocKqjWjvFvSnysVYF6o/mX0mzU8Q875FlKui96zAAAAABJRU5ErkJggg=="
              x="-18"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑旋转"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABX1BMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/Pzo6Oh+fn4uLi4HBwcGBgYqKip3d3fl5eVbW1v7+/u1tbUSEhIAAAAICAgxMTEzMzMMDAynp6dYWFi0tLQEBASKiorw8PDz8/OYmJgPDw8BAQFWVlb6+vrv7+8ZGRkKCgrCwsLPz8/h4eFUVFT5+fmRkZGAgICVlZV0dHRRUVH4+PhEREQDAwPx8fEsLCxPT0/39/fJycnGxsYcHBwWFhbu7u5MTEz19fVKSkp2dnY/Pz9ISEhkZGQrKyvm5uaSkpJycnJFRUXe3t4ODg4LCwva2tpDQ0Py8vKpqamIiIjp6enq6uqUlJSgoKBBQUHk5OQaGhoJCQkyMjKampo+Pj56enpwcHA8PDyenp41NTV1I7FBAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABN0lEQVQoz23J6TsCURgF8LfV0mqGFqRMcdUVSpvQQlFN0UJEabEVEeX/f9yZO5/mmd+H895zD4BKrVmS0ahVAFodwy7LsIxOC3pmRQGjhzmbXQE7Dw67Igc4VyVr664Nt2eTo80JXh+1tY12/AGM8K5YvRCk/3v7+CDk84UPI1FxCUIsLkgcJY/FR/wkgk/JiUEqLcigbFpyhs5JpiCXF1xccnlJARdJ5qDE83y5cnVdqVR5KuAmUYIay7IZRATrLBXAJGrQqBM3CN0m6lQVF0k2oGkT3N23bJIH9EiyCe2wINQJS8pP3R45begPJM8vr4PB23skOhRaH0YF6uMTjf1fXdT9FusIJtJQ6Py4kmPPb4+2CUxDiqawwCUUtBbBMFQahgYwmmZcVYabmYwAZov1T8ZqMcM/0Mxz3GjPMWoAAAAASUVORK5CYII="
              x="100"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑缩放"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA1VBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/PwAAABKSkpbW1v7+/tLS0v19fVYWFgWFhbx8fFWVlb6+voVFRVSUlJUVFT5+fnv7+9RUVH4+Pjy8vLz8/NPT0/39/djY2NMTExiYmLw8PBJSUlISEhQUFDq6upFRUXu7u4UFBRDQ0Po6OhBQUHr6+s+Pj48PDzl5eXm5uagoKCenp41NTVutcKlAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA9klEQVQoz23Q6VLCMBQF4MPqwmqjZbmlFgsUmhYQoRVElgq+/yOZOEIzNd9MJif3/LoBcvnCQ0YhnwOKJYM9ZjCjVETZeNIwyrgxWxrsFu2WVhudrkCSxbqpDnq2IOfPjq3oof9XvLjq3O5jMBSIRuSxoWKA8UQgy/fIcyapMXggWGEwFY0ZXHHM5oIrTshfnXB+McOCXbjmGw/FvZSPBSznyuXEXcdfyWwhMlN+TPH7imSMsJ4qNjF9EMm0xjZUfY7ErjJssXMV+0h+jkw7HP7Nf4sDjkutI+4SX+PrHpWTrjhVUK2dk01Gcq5VgXqj+Z3RbNTxA1TOTngb3xHTAAAAAElFTkSuQmCC"
              x="100"
              y="100"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑删除"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX195eXkBAQEAAABdXV38/PxKSkqysrJbW1v7+/tJSUkREREFBQUMDAxYWFja2tpWVlb6+voKCgpTU1NUVFT5+fnGxsZOTk6mpqbHx8dRUVH4+Ph1dXWDg4P39/fCwsLe3t7Z2dnDw8NPT090dHTb29seHh4fHx/Nzc1MTEyCgoIdHR3Ly8v19fVzc3PY2NjKyspISEiBgYHX19fJyclFRUXz8/NycnLW1tbIyMhDQ0Py8vKAgIAcHBxBQUHx8fF+fn7t7e2qqqrOzs6xsbE+Pj6YmJg8PDzj4+M7Ozvw8PDs7OxZWVnl5eXv7+/m5uagoKCenp7u7u41NTUwGSPSAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABQ0lEQVQoz23JV1PCQBQF4Eu1UE00AqFJAiKiKE0RVGAlCgqhSVEpCijo/393bwZmGCbfwzl3zwJotLq9DTqtBkBvYNj9DSxj0IOROVDBGGGLO1TBboNjdTtdPO9yrl4OcHuWvD6Px+ddvdzgP6ICgiCIQUEIivQI4OKHEBZ/vIbHJQThEypyuiaCSxiiZ9R5LHSxFIpd4hKFeAIlU+mrxHUmccOlksoQh2wa5VK3d+lULn2fp4GyUGBRrpghbDHHkgcaqADeEpKKj6RUlErkiQbyQplDUuWZcBWJIy80UBmqNSRX6qRWkWukQQNVodlCcrv+2mrLLdKggZrQ6SK513/rvue7H/2erAwdGCg9HI2V7o4/h0oPYPSFJlORV4jTiTKMYGf2reJnF0xztY+5CcyWxex3w2xhMQNYbfa/DXabFf4BuK96ZClD1l4AAAAASUVORK5CYII="
              x="-18"
              y="100"
              width="18"
              height="18"
            ></image>
          </g>
        </g>
        <g test="设计图最外层g" type="设计图">
          <g
            test="设计图的边框的边框-clip"
            :style="{ clipPath: `url(#${prod.mode})` }"
          >
            <g
              test="设计图的边框"
              style="cursor: move"
              transform="matrix(1,0,0,1,218,156)"
            >
              <image
                test="设计图"
                bm="edit"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAMAAABOo35HAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARVBMVEUAAAAAAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP4AAP7///9b/nNZAAAAFXRSTlMAAAIcIw4NtOfkWMljx/xiBUJUUyCwsZuvAAAAAWJLR0QWfNGoGQAAAAlwSFlzAAAXEgAAFxIBZ5/SUgAAAAd0SU1FB+YGFQgGJfcDIksAAAGPSURBVHja7dDHEcJAAAAxcs7g/lulBr8W5qQStFgAAAAAAAAAAAAAAAAAAAAAAADwo5ar9WZU2+XcrN3+cBzUaXbW9jyN6iJLlqyaLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZIlKydLlqycLFmycrJkycrJkiUrJ0uWrJwsWbJysmTJysmSJSsnS5asnCxZsnKyZMnKyZL1M1nX6Tao++ysx/P1HtRnbhYAAAAA8Oe+tguDipqSmkoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDYtMjFUMDg6MDY6MzYrMDA6MDB/BjTEAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA2LTIxVDA4OjA2OjM2KzAwOjAwDluMeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="
                x="0"
                y="0"
                width="100"
                height="100"
                style="cursor: move; overflow: hidden"
              ></image>
            </g>
          </g>
          <g
            test="编辑的边框"
            style="display: none"
            transform="matrix(1,0,0,1,218,156)"
          >
            <rect
              test="编辑的矩形"
              x="0"
              y="0"
              width="100"
              height="100"
              stroke="#000000"
              fill="none"
              style=""
            ></rect>
            <image
              test="编辑移动"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA0lBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19/f39dXV38/Px+fn4AAABbW1v7+/tYWFgPDw9WVlb6+vpUVFT5+fl9fX1RUVH4+Ph8fHxPT0/39/cQEBABAQFMTEx7e3tKSkr19fV6enoODg5ISEhFRUXz8/NDQ0Py8vJBQUHx8fF4eHg+Pj48PDzw8PDl5eXv7+/m5uagoKCenp7u7u41NTVmmCopAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA8UlEQVQoz23Q2VLCQBAF0MvqwmpGIyANDIIYIosZEEnAKOj//5LTVWQGUjkPt253vzWQyxfuUgr5HFAsOeI+RTilIsrOQwanjCv3MYO4RstO7bbtLXSeEl2irhk66PVP9F5fkqmHQd+Q0vYBhs+GlLYPMRqzFw4pTR2PMHnVPOKUkpM8zgmmvu97RG/abMZJ5OnVFHMhxOLysNCrOZbvWkCcSnFSwLnEymUBh1KmuiusPwylbF9j82koZfsG2/Ak4pdEybTFLjy7mH24w/7LiCLb97iJvzP83KJyyDocKqjWjvFvSnysVYF6o/mX0mzU8Q875FlKui96zAAAAABJRU5ErkJggg=="
              x="-18"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑旋转"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABX1BMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/Pzo6Oh+fn4uLi4HBwcGBgYqKip3d3fl5eVbW1v7+/u1tbUSEhIAAAAICAgxMTEzMzMMDAynp6dYWFi0tLQEBASKiorw8PDz8/OYmJgPDw8BAQFWVlb6+vrv7+8ZGRkKCgrCwsLPz8/h4eFUVFT5+fmRkZGAgICVlZV0dHRRUVH4+PhEREQDAwPx8fEsLCxPT0/39/fJycnGxsYcHBwWFhbu7u5MTEz19fVKSkp2dnY/Pz9ISEhkZGQrKyvm5uaSkpJycnJFRUXe3t4ODg4LCwva2tpDQ0Py8vKpqamIiIjp6enq6uqUlJSgoKBBQUHk5OQaGhoJCQkyMjKampo+Pj56enpwcHA8PDyenp41NTV1I7FBAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABN0lEQVQoz23J6TsCURgF8LfV0mqGFqRMcdUVSpvQQlFN0UJEabEVEeX/f9yZO5/mmd+H895zD4BKrVmS0ahVAFodwy7LsIxOC3pmRQGjhzmbXQE7Dw67Igc4VyVr664Nt2eTo80JXh+1tY12/AGM8K5YvRCk/3v7+CDk84UPI1FxCUIsLkgcJY/FR/wkgk/JiUEqLcigbFpyhs5JpiCXF1xccnlJARdJ5qDE83y5cnVdqVR5KuAmUYIay7IZRATrLBXAJGrQqBM3CN0m6lQVF0k2oGkT3N23bJIH9EiyCe2wINQJS8pP3R45begPJM8vr4PB23skOhRaH0YF6uMTjf1fXdT9FusIJtJQ6Py4kmPPb4+2CUxDiqawwCUUtBbBMFQahgYwmmZcVYabmYwAZov1T8ZqMcM/0Mxz3GjPMWoAAAAASUVORK5CYII="
              x="100"
              y="-18"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑缩放"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA1VBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX19dXV38/PwAAABKSkpbW1v7+/tLS0v19fVYWFgWFhbx8fFWVlb6+voVFRVSUlJUVFT5+fnv7+9RUVH4+Pjy8vLz8/NPT0/39/djY2NMTExiYmLw8PBJSUlISEhQUFDq6upFRUXu7u4UFBRDQ0Po6OhBQUHr6+s+Pj48PDzl5eXm5uagoKCenp41NTVutcKlAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAA9klEQVQoz23Q6VLCMBQF4MPqwmqjZbmlFgsUmhYQoRVElgq+/yOZOEIzNd9MJif3/LoBcvnCQ0YhnwOKJYM9ZjCjVETZeNIwyrgxWxrsFu2WVhudrkCSxbqpDnq2IOfPjq3oof9XvLjq3O5jMBSIRuSxoWKA8UQgy/fIcyapMXggWGEwFY0ZXHHM5oIrTshfnXB+McOCXbjmGw/FvZSPBSznyuXEXcdfyWwhMlN+TPH7imSMsJ4qNjF9EMm0xjZUfY7ErjJssXMV+0h+jkw7HP7Nf4sDjkutI+4SX+PrHpWTrjhVUK2dk01Gcq5VgXqj+Z3RbNTxA1TOTngb3xHTAAAAAElFTkSuQmCC"
              x="100"
              y="100"
              width="18"
              height="18"
            ></image>
            <image
              test="编辑删除"
              bm="edit"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABRFBMVEUAAABlZWVlZWVlZWVkZGRkZGRiYmJgYGBgYGA6Ojo6Ojo5OTk3Nzc3Nzc1NTU1NTU1NTVlZWW6urr29vb////+/v709PT9/f1fX195eXkBAQEAAABdXV38/PxKSkqysrJbW1v7+/tJSUkREREFBQUMDAxYWFja2tpWVlb6+voKCgpTU1NUVFT5+fnGxsZOTk6mpqbHx8dRUVH4+Ph1dXWDg4P39/fCwsLe3t7Z2dnDw8NPT090dHTb29seHh4fHx/Nzc1MTEyCgoIdHR3Ly8v19fVzc3PY2NjKyspISEiBgYHX19fJyclFRUXz8/NycnLW1tbIyMhDQ0Py8vKAgIAcHBxBQUHx8fF+fn7t7e2qqqrOzs6xsbE+Pj6YmJg8PDzj4+M7Ozvw8PDs7OxZWVnl5eXv7+/m5uagoKCenp7u7u41NTUwGSPSAAAAEXRSTlMAJa3xJ++t8fPx860o7yet8jdUVgQAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAABQ0lEQVQoz23JV1PCQBQF4Eu1UE00AqFJAiKiKE0RVGAlCgqhSVEpCijo/393bwZmGCbfwzl3zwJotLq9DTqtBkBvYNj9DSxj0IOROVDBGGGLO1TBboNjdTtdPO9yrl4OcHuWvD6Px+ddvdzgP6ICgiCIQUEIivQI4OKHEBZ/vIbHJQThEypyuiaCSxiiZ9R5LHSxFIpd4hKFeAIlU+mrxHUmccOlksoQh2wa5VK3d+lULn2fp4GyUGBRrpghbDHHkgcaqADeEpKKj6RUlErkiQbyQplDUuWZcBWJIy80UBmqNSRX6qRWkWukQQNVodlCcrv+2mrLLdKggZrQ6SK513/rvue7H/2erAwdGCg9HI2V7o4/h0oPYPSFJlORV4jTiTKMYGf2reJnF0xztY+5CcyWxex3w2xhMQNYbfa/DXabFf4BuK96ZClD1l4AAAAASUVORK5CYII="
              x="-18"
              y="100"
              width="18"
              height="18"
            ></image>
          </g>
        </g>
      </g>
      <image
        test="[预览模式]产品图"
        :href="prod.previewProdImage.href"
        :x="prod.previewProdImage.x"
        :y="prod.previewProdImage.y"
        :width="prod.previewProdImage.width"
        :height="prod.previewProdImage.height"
        :style="{
          pointerEvents: 'none',
          display: displayByMode(prod.previewProdImage.type),
        }"
      ></image>
      <path
        test="[设计模式][产品的红色虚线]path-d3"
        :d="prod.editProdRedPath.d"
        fill="none"
        stroke="#ff0000"
        :style="{
          strokeWidth: 1.8,
          strokeDasharray: 5,
          display: displayByMode(prod.editProdRedPath.type),
        }"
        :transform="prod.editProdRedPath.transform"
      ></path>
      <rect
        test="[编辑模式]边框的黑色虚线rect"
        :x="prod.editBdBackRect.x"
        :y="prod.editBdBackRect.y"
        :width="prod.editBdBackRect.width"
        :height="prod.editBdBackRect.height"
        fill="none"
        stroke="#000000"
        :style="{
          strokeDasharray: 2,
          display: displayByMode(prod.editBdBackRect.type),
        }"
        :transform="prod.editBdBackRect.transform"
      ></rect>
    </svg>
  </div>
</template>

<script>
import { ProdInterface, ProdMode } from "./interface/prod";
import { mock } from "../bmDesigner/mock";

export default {
  name: "index",
  data() {
    return {
      prodMode: ProdMode,
      prod: new ProdInterface(mock.productList()[0]),
    };
  },
  computed: {
    /*
     * 根据模式(mode)和元素类型(type)返回对应的 display
     * @param {number} type 元素类型
     * */
    displayByMode() {
      return (type) => {
        let display = "none";
        if (this.prod.isPreviewMode()) {
          if (ProdMode.isPreview(type)) {
            display = "inline";
          } else if (ProdMode.isEdit(type)) {
            display = "none";
          }
        } else if (this.prod.isEditMode()) {
          if (ProdMode.isPreview(type)) {
            display = "none";
          } else if (ProdMode.isEdit(type)) {
            display = "inline";
          }
        }
        return display;
      };
    },
  },
  mounted() {
    console.log(this.prod);
  },
};
</script>

<style scoped></style>

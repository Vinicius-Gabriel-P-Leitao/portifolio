declare module '*.svg?react' {
  import type FC from 'react'

  const ReactComponent: FC<React.SVGProps<SVGSVGElement>>
  export default ReactComponent
}

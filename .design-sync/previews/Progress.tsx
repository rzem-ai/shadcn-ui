import { Progress } from "@/registry/new-york-v4/ui/progress"

export function ProgressScale() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Progress value={0} />
      <Progress value={33} />
      <Progress value={66} />
      <Progress value={100} />
    </div>
  )
}

export function LabelledProgress() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex items-center justify-between text-sm font-medium">
        <span>Upload progress</span>
        <span className="tabular-nums text-muted-foreground">66%</span>
      </div>
      <Progress value={66} />
      <p className="text-xs text-muted-foreground">
        3 of 5 files uploaded — about 45 seconds remaining.
      </p>
    </div>
  )
}

export function FileUploadProgress() {
  const files = [
    { name: "annual-report.pdf", value: 45, remaining: "2m 30s" },
    { name: "roadmap.pptx", value: 78, remaining: "45s" },
    { name: "forecast.xlsx", value: 12, remaining: "5m 12s" },
    { name: "cover.jpg", value: 100, remaining: "Complete" },
  ]

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      {files.map((file) => (
        <div key={file.name} className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span className="truncate font-medium">{file.name}</span>
            <span className="text-xs tabular-nums text-muted-foreground">
              {file.remaining}
            </span>
          </div>
          <Progress value={file.value} />
        </div>
      ))}
    </div>
  )
}

export enum Status {
  PENDING = 1,
  REJECTED = 2,
  COMPLETED = 3,
}

export enum LabelStatus {
  PENDING = "Đang chờ phê duyệt",
  REJECTED = "Đăng ký thất bại",
  COMPLETED = "Gửi đăng ký thành công",
}

export enum ColorStatus {
  PENDING = "warning",
  REJECTED = "error",
  COMPLETED = "success",
}
export const statusColorMap: Record<Status, ColorStatus> = {
  [Status.COMPLETED]: ColorStatus.COMPLETED,
  [Status.PENDING]: ColorStatus.PENDING,
  [Status.REJECTED]: ColorStatus.REJECTED,
};

export const statusLabelMap: Record<Status, LabelStatus> = {
  [Status.COMPLETED]: LabelStatus.COMPLETED,
  [Status.PENDING]: LabelStatus.PENDING,
  [Status.REJECTED]: LabelStatus.REJECTED,
};

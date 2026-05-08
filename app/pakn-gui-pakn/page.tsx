"use client";

import { Breadcrumbs, Card } from "@heroui/react";
import { useState, useRef, useEffect } from "react";
import {
  Building2,
  MapPin,
  ChevronDown,
  Paperclip,
  X,
  Send,
  AlertCircle,
  CheckCircle2,
  Wrench,
  Stethoscope,
  FileText,
  Upload,
  ChevronRight,
} from "lucide-react";

const POSITIONS = [
  { id: "phong-cap-cuu", label: "Phòng Cấp Cứu", floor: "Tầng 1" },
  { id: "phong-noi-khoa", label: "Phòng Nội Khoa", floor: "Tầng 2" },
  { id: "phong-ngoai-khoa", label: "Phòng Ngoại Khoa", floor: "Tầng 2" },
  { id: "phong-san", label: "Phòng Sản Khoa", floor: "Tầng 3" },
  { id: "phong-nhi", label: "Phòng Nhi Khoa", floor: "Tầng 3" },
  { id: "phong-xet-nghiem", label: "Phòng Xét Nghiệm", floor: "Tầng 1" },
  { id: "phong-chan-doan", label: "Phòng Chẩn Đoán Hình Ảnh", floor: "Tầng 1" },
  { id: "phong-phau-thuat", label: "Phòng Phẫu Thuật", floor: "Tầng 4" },
  { id: "phong-icu", label: "Phòng ICU", floor: "Tầng 4" },
  { id: "phong-duoc", label: "Khoa Dược", floor: "Tầng 1" },
  { id: "hanh-chinh", label: "Phòng Hành Chính", floor: "Tầng 5" },
  { id: "phong-kham", label: "Phòng Khám Tổng Quát", floor: "Tầng 2" },
];

const DEVICES_BY_POSITION: Record<string, string[]> = {
  "phong-cap-cuu": ["Máy Monitor tim mạch", "Máy thở", "Máy sốc điện", "Cáng cứu thương", "Tủ thuốc cấp cứu"],
  "phong-noi-khoa": ["Giường bệnh", "Máy đo huyết áp", "Máy siêu âm", "Hệ thống oxy", "Tủ đầu giường"],
  "phong-ngoai-khoa": ["Bàn mổ", "Đèn mổ", "Máy hút dịch", "Dụng cụ phẫu thuật", "Tủ đựng dụng cụ"],
  "phong-san": ["Giường sinh", "Máy Monitor thai", "Máy siêu âm sản khoa", "Lồng ấp trẻ sơ sinh", "Thiết bị hồi sức sơ sinh"],
  "phong-nhi": ["Giường nhi", "Lồng ấp", "Máy đo SpO2 nhi", "Thiết bị hút đờm", "Cân trẻ em"],
  "phong-xet-nghiem": ["Máy phân tích huyết học", "Máy sinh hóa tự động", "Máy ly tâm", "Tủ lạnh bảo quản mẫu", "Máy PCR"],
  "phong-chan-doan": ["Máy X-quang", "Máy CT Scan", "Máy MRI", "Máy siêu âm tổng quát", "Hệ thống PACS"],
  "phong-phau-thuat": ["Bàn mổ điện", "Đèn mổ treo trần", "Máy gây mê", "Dao mổ điện", "Hệ thống nội soi"],
  "phong-icu": ["Máy thở ICU", "Máy Monitor đa thông số", "Máy lọc máu", "Bơm tiêm điện", "Hệ thống báo động trung tâm"],
  "phong-duoc": ["Tủ bảo quản thuốc", "Máy đếm viên thuốc", "Tủ lạnh vaccine", "Hệ thống quản lý thuốc", "Cân dược"],
  "hanh-chinh": ["Máy tính", "Máy in", "Máy photo", "Điều hòa nhiệt độ", "Hệ thống mạng nội bộ"],
  "phong-kham": ["Ghế khám bệnh", "Đèn khám tai mũi họng", "Máy đo nhãn áp", "Cân đo chiều cao", "Máy điện tim"],
};

const TOPICS = [
  { id: "csvc-huong-dan", label: "Cơ sở vật chất & Hướng dẫn", dept: "Ban Quản lý" },
  { id: "ve-sinh-moi-truong", label: "Vệ sinh môi trường", dept: "Phòng Điều dưỡng" },
  { id: "trang-thiet-bi", label: "Trang thiết bị y tế", dept: "Phòng Vật tư" },
  { id: "dich-vu-kham", label: "Dịch vụ khám chữa bệnh", dept: "Phòng Kế hoạch" },
  { id: "thai-do-nv", label: "Thái độ nhân viên", dept: "Phòng Nhân sự" },
  { id: "chuyen-mon", label: "Chuyên môn y tế", dept: "Phòng Chuyên môn" },
  { id: "thu-tuc-hanh-chinh", label: "Thủ tục hành chính", dept: "Phòng Hành chính" },
  { id: "vien-phi", label: "Viện phí & Thanh toán", dept: "Phòng Tài chính" },
  { id: "an-toan-benh-nhan", label: "An toàn người bệnh", dept: "Phòng Kiểm soát chất lượng" },
  { id: "thuoc-vat-tu", label: "Thuốc & Vật tư y tế", dept: "Khoa Dược" },
];

const INCIDENTS = [
  { id: "hong-hoc", label: "Thiết bị hỏng / không hoạt động", severity: "high" },
  { id: "thieu-thiet-bi", label: "Thiếu thiết bị cần thiết", severity: "high" },
  { id: "khong-ve-sinh", label: "Không đảm bảo vệ sinh", severity: "medium" },
  { id: "gay-vo", label: "Thiết bị bị gãy / vỡ", severity: "medium" },
  { id: "het-han", label: "Vật tư hết hạn sử dụng", severity: "high" },
  { id: "thieu-thuoc", label: "Thiếu thuốc điều trị", severity: "high" },
  { id: "thai-do-xau", label: "Thái độ không chuyên nghiệp", severity: "medium" },
  { id: "cham-tre", label: "Chậm trễ trong xử lý", severity: "low" },
  { id: "sai-quy-trinh", label: "Sai quy trình kỹ thuật", severity: "high" },
  { id: "khac", label: "Vấn đề khác", severity: "low" },
];

function SearchableDropdown({
  label,
  placeholder,
  options,
  value,
  onChange,
  renderOption,
  renderValue,
  icon,
  required,
}: {
  label: string;
  placeholder: string;
  options: any[];
  value: string;
  onChange: (v: string) => void;
  renderOption: (o: any) => React.ReactNode;
  renderValue: (o: any) => string;
  icon?: React.ReactNode;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.id === value);

  const filtered = options.filter((o) =>
    renderValue(o).toLowerCase().includes(query.toLowerCase())
  );

  const openMenu = () => {
    setOpen(true);
    setQuery("");
  };

  const closeMenu = () => {
    setOpen(false);
    setQuery("");
  };

  const choose = (id: string) => {
    onChange(id);
    closeMenu();
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setQuery("");
    inputRef.current?.focus();
    setOpen(true);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayValue = open ? query : selected ? renderValue(selected) : "";

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-xs font-semibold text-[#465D7C] mb-1.5 uppercase tracking-wide">
        {label}
        {required && <span className="text-[#0E82FD] ml-0.5">*</span>}
      </label>

      {/* Trigger row */}
      <div
        className={[
          "w-full flex items-center gap-2.5 px-3.5 h-10 rounded-xl border transition-all cursor-text bg-white",
          open
            ? "border-[#0E82FD] shadow-[0_0_0_3px_rgba(14,130,253,0.12)]"
            : "border-[#E6E8EE] hover:border-[#0E82FD]/60",
        ].join(" ")}
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).closest(".dd-clear-btn")) return;
          if (!open) {
            e.preventDefault();
            inputRef.current?.focus();
            openMenu();
          }
        }}
      >
        {icon && (
          <span className={`shrink-0 ${open || selected ? "text-[#0E82FD]" : "text-[#465D7C]/40"}`}>
            {icon}
          </span>
        )}

        <input
          ref={inputRef}
          type="text"
          className="flex-1 min-w-0 bg-transparent outline-none text-sm text-[#012047] placeholder:text-[#465D7C]/40"
          placeholder={placeholder}
          value={displayValue}
          onFocus={() => { if (!open) openMenu(); }}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange("");
            if (!open) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeMenu();
          }}
        />

        {selected && !open && (
          <button
            type="button"
            className="dd-clear-btn shrink-0 w-4 h-4 rounded-full bg-[#465D7C]/10 hover:bg-red-100 flex items-center justify-center transition-colors"
            onClick={clearSelection}
          >
            <X size={9} className="text-[#465D7C] hover:text-red-500" />
          </button>
        )}

        <ChevronDown
          size={15}
          className={`shrink-0 text-[#465D7C]/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown list */}
      {open && (
        <>
          <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-[#E6E8EE] bg-white shadow-xl shadow-[#012047]/10 overflow-hidden">
            <div className="max-h-52 overflow-y-auto py-1">
              {filtered.length === 0 ? (
                <div className="px-3 py-4 text-center text-sm text-[#465D7C]/50">
                  Không tìm thấy kết quả
                </div>
              ) : (
                filtered.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); choose(o.id); }}
                    className={[
                      "w-full text-left px-3 py-2 text-sm transition-colors",
                      o.id === value
                        ? "bg-[#F6FAFF] text-[#0E82FD] font-medium"
                        : "text-[#012047] hover:bg-[#F6FAFF]",
                    ].join(" ")}
                  >
                    {renderOption(o)}
                  </button>
                ))
              )}
            </div>
          </div>
          <div className="fixed inset-0 z-40" onMouseDown={closeMenu} />
        </>
      )}
    </div>
  );
}

function RadioGroup({
  label,
  options,
  value,
  onChange,
  required,
}: {
  label: string;
  options: { id: string; label: string; icon: React.ReactNode; desc: string }[];
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#465D7C] mb-1.5 uppercase tracking-wide">
        {label}
        {required && <span className="text-[#0E82FD] ml-0.5">*</span>}
      </label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={[
              "relative flex flex-col gap-1.5 p-4 rounded-xl border-2 text-left transition-all",
              value === opt.id
                ? "border-[#0E82FD] bg-[#F6FAFF] shadow-[0_0_0_3px_rgba(14,130,253,0.10)]"
                : "border-[#E6E8EE] bg-white hover:border-[#0E82FD]/40 hover:bg-[#F6FAFF]/50",
            ].join(" ")}
          >
            <span className={value === opt.id ? "text-[#0E82FD]" : "text-[#465D7C]/60"}>
              {opt.icon}
            </span>
            <span className={`text-sm font-semibold ${value === opt.id ? "text-[#0E82FD]" : "text-[#012047]"}`}>
              {opt.label}
            </span>
            <span className="text-[11px] text-[#465D7C]/70 leading-tight">{opt.desc}</span>
            {value === opt.id && (
              <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#0E82FD] flex items-center justify-center">
                <CheckCircle2 size={10} className="text-white fill-white" />
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function SeverityDot({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    high: "bg-red-400",
    medium: "bg-amber-400",
    low: "bg-emerald-400",
  };
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-0.5 ${map[severity] ?? "bg-gray-400"}`} />
  );
}

export default function GuiPhanAnh() {
  const [position, setPosition] = useState("");
  const [reportType, setReportType] = useState("");
  const [device, setDevice] = useState("");
  const [topic, setTopic] = useState("");
  const [incident, setIncident] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const devices = position
    ? (DEVICES_BY_POSITION[position] ?? []).map((d, i) => ({ id: `d${i}`, label: d }))
    : [];
  const showDevices = reportType === "csvc" && position;

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? []);
    setFiles((prev) => [...prev, ...picked].slice(0, 5));
    e.target.value = "";
  };

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const isValid = position && reportType && topic && incident && content.trim().length > 10;

  if (submitted) {
    return (
      <section className="flex flex-col min-h-screen bg-[#F6FAFF]">
        <div className="max-w-lg mx-auto w-full px-4 py-20 flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-[#0E82FD]/10 flex items-center justify-center">
            <CheckCircle2 size={40} className="text-[#0E82FD]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#012047] mb-2">Gửi phản ánh thành công!</h2>
            <p className="text-[#465D7C] text-sm leading-relaxed">
              Cảm ơn bạn đã gửi phản ánh. Chúng tôi sẽ xem xét và phản hồi trong thời gian sớm nhất.
            </p>
          </div>
          <div className="w-full rounded-xl border border-[#E6E8EE] bg-white p-4 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#465D7C]">Mã phản ánh</span>
              <span className="font-mono font-bold text-[#0E82FD]">#PA{Date.now().toString().slice(-6)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#465D7C]">Trạng thái</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Đã tiếp nhận
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setPosition("");
              setReportType("");
              setDevice("");
              setTopic("");
              setIncident("");
              setContent("");
              setFiles([]);
            }}
            className="px-6 py-2.5 rounded-xl bg-[#0E82FD] text-white text-sm font-semibold hover:bg-[#0E82FD]/90 transition-colors"
          >
            Gửi phản ánh mới
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col min-h-screen">
      <div className="px-1 pt-1">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/">Trang chủ</Breadcrumbs.Item>
          <Breadcrumbs.Item>Gửi phản ánh</Breadcrumbs.Item>
        </Breadcrumbs>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
          <div className="lg:col-span-4 flex flex-col gap-4">

            <div className="p-5 flex flex-col gap-4">
                <StepLabel number={1} title="Vị trí phản ánh" />
                <SearchableDropdown
                  label="Phòng / Khoa"
                  placeholder="Chọn phòng hoặc khoa..."
                  options={POSITIONS}
                  value={position}
                  onChange={(v) => { setPosition(v); setDevice(""); }}
                  icon={<MapPin size={16} />}
                  required
                  renderValue={(o) => o.label}
                  renderOption={(o) => (
                    <div className="flex items-center justify-between">
                      <span>{o.label}</span>
                      <span className="text-[11px] text-[#465D7C]/50 font-mono">{o.floor}</span>
                    </div>
                  )}
                />
              </div>

            <div className="p-5 flex flex-col gap-4">
                <StepLabel number={2} title="Loại phản ánh" />
                <RadioGroup
                  label="Chọn loại phản ánh"
                  required
                  value={reportType}
                  onChange={(v) => { setReportType(v); setDevice(""); }}
                  options={[
                    {
                      id: "csvc",
                      label: "Cơ sở vật chất",
                      icon: <Building2 size={20} />,
                      desc: "Trang thiết bị, cơ sở hạ tầng, vệ sinh môi trường",
                    },
                    {
                      id: "nhanvien",
                      label: "Nhân viên y tế",
                      icon: <Stethoscope size={20} />,
                      desc: "Thái độ, chuyên môn, quy trình phục vụ",
                    },
                  ]}
                />

                {showDevices && (
                  <div className="rounded-xl border border-[#0E82FD]/20 bg-[#F6FAFF] p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#0E82FD] uppercase tracking-wide">
                      <Wrench size={13} />
                      Thiết bị liên quan
                    </div>
                    <SearchableDropdown
                      label="Danh mục thiết bị"
                      placeholder="Chọn thiết bị..."
                      options={devices}
                      value={device}
                      onChange={setDevice}
                      icon={<Wrench size={15} />}
                      renderValue={(o) => o.label}
                      renderOption={(o) => <span>{o.label}</span>}
                    />
                  </div>
                )}
              </div>

            <div className="p-5 flex flex-col gap-4">
                <StepLabel number={3} title="Phân loại chi tiết" />

                <SearchableDropdown
                  label="Chủ đề phản ánh"
                  placeholder="Chọn chủ đề..."
                  options={TOPICS}
                  value={topic}
                  onChange={setTopic}
                  icon={<FileText size={16} />}
                  required
                  renderValue={(o) => o.label}
                  renderOption={(o) => (
                    <div>
                      <div>{o.label}</div>
                      <div className="text-[11px] text-[#465D7C]/50">{o.dept}</div>
                    </div>
                  )}
                />

                <SearchableDropdown
                  label="Loại sự cố"
                  placeholder="Chọn loại sự cố..."
                  options={INCIDENTS}
                  value={incident}
                  onChange={setIncident}
                  icon={<AlertCircle size={16} />}
                  required
                  renderValue={(o) => o.label}
                  renderOption={(o) => (
                    <div className="flex items-start gap-2">
                      <SeverityDot severity={o.severity} />
                      <span>{o.label}</span>
                    </div>
                  )}
                />
              </div>

              <div className="p-5 flex flex-col gap-4">
                <StepLabel number={4} title="Nội dung phản ánh" />
                <div>
                  <label className="block text-xs font-semibold text-[#465D7C] mb-1.5 uppercase tracking-wide">
                    Mô tả chi tiết <span className="text-[#0E82FD]">*</span>
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Mô tả chi tiết sự việc, thời gian xảy ra, và những vấn đề bạn gặp phải..."
                    rows={5}
                    className={[
                      "w-full rounded-xl border px-3.5 py-2.5 text-sm text-[#012047] placeholder:text-[#465D7C]/40",
                      "outline-none resize-none transition-all bg-white",
                      content.length > 0
                        ? "border-[#0E82FD] shadow-[0_0_0_3px_rgba(14,130,253,0.10)]"
                        : "border-[#E6E8EE] focus:border-[#0E82FD] focus:shadow-[0_0_0_3px_rgba(14,130,253,0.10)]",
                    ].join(" ")}
                  />
                  <div className="flex justify-between mt-1.5">
                    {content.length < 10 && content.length > 0 ? (
                      <span className="text-[11px] text-red-400">Tối thiểu 10 ký tự</span>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`text-[11px] ml-auto ${content.length > 900 ? "text-amber-500" : "text-[#465D7C]/40"}`}
                    >
                      {content.length}/1000
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#465D7C] mb-1.5 uppercase tracking-wide">
                    Tệp đính kèm
                  </label>

                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full flex flex-col items-center gap-2 py-5 rounded-xl border-2 border-dashed border-[#E6E8EE] hover:border-[#0E82FD]/50 hover:bg-[#F6FAFF] transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#F6FAFF] group-hover:bg-[#0E82FD]/10 flex items-center justify-center transition-colors">
                      <Upload size={16} className="text-[#465D7C]/50 group-hover:text-[#0E82FD] transition-colors" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-[#012047]">Nhấn để chọn tệp</p>
                      <p className="text-[11px] text-[#465D7C]/50">PNG, JPG, PDF, MP4 · Tối đa 5 tệp · 10MB/tệp</p>
                    </div>
                  </button>

                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.mp4"
                    onChange={handleFiles}
                    className="hidden"
                  />

                  {files.length > 0 && (
                    <div className="mt-2 flex flex-col gap-1.5">
                      {files.map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-[#F6FAFF] border border-[#E6E8EE]"
                        >
                          <Paperclip size={13} className="text-[#0E82FD] shrink-0" />
                          <span className="flex-1 text-xs text-[#012047] truncate">{f.name}</span>
                          <span className="text-[11px] text-[#465D7C]/50 shrink-0">
                            {(f.size / 1024).toFixed(0)} KB
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="shrink-0 w-4 h-4 rounded-full bg-[#465D7C]/10 hover:bg-red-100 flex items-center justify-center transition-colors"
                          >
                            <X size={9} className="text-[#465D7C] hover:text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            <div className="lg:hidden">
              <SubmitButton submitting={submitting} isValid={!!isValid} />
            </div>
          </div>

          <aside className="lg:col-span-2 flex flex-col gap-4">

            <Card className="border border-[#E6E8EE] shadow-none bg-white rounded-2xl sticky top-4">
              <div className="p-5 flex flex-col gap-4">
                <h3 className="text-sm font-bold text-[#012047]">Tóm tắt phản ánh</h3>

                <div className="flex flex-col gap-2">
                  <SummaryRow
                    label="Vị trí"
                    value={POSITIONS.find((p) => p.id === position)?.label}
                    icon={<MapPin size={13} />}
                  />
                  <SummaryRow
                    label="Loại"
                    value={
                      reportType === "csvc"
                        ? "Cơ sở vật chất"
                        : reportType === "nhanvien"
                        ? "Nhân viên y tế"
                        : undefined
                    }
                    icon={<Building2 size={13} />}
                  />
                  {device && (
                    <SummaryRow
                      label="Thiết bị"
                      value={devices.find((d) => d.id === device)?.label}
                      icon={<Wrench size={13} />}
                    />
                  )}
                  <SummaryRow
                    label="Chủ đề"
                    value={TOPICS.find((t) => t.id === topic)?.label}
                    icon={<FileText size={13} />}
                  />
                  <SummaryRow
                    label="Sự cố"
                    value={INCIDENTS.find((i) => i.id === incident)?.label}
                    icon={<AlertCircle size={13} />}
                  />
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-[#465D7C]/60 mb-1.5">
                    <span>Hoàn thành</span>
                    <span className="font-semibold text-[#0E82FD]">
                      {[position, reportType, topic, incident, content.trim().length > 10].filter(Boolean).length}/5
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E6E8EE] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#0E82FD] transition-all duration-500"
                      style={{
                        width: `${
                          ([position, reportType, topic, incident, content.trim().length > 10].filter(Boolean).length /
                            5) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Submit button desktop */}
                <div className="hidden lg:block">
                  <SubmitButton submitting={submitting} isValid={!!isValid} />
                </div>

                <p className="text-[11px] text-[#465D7C]/50 text-center leading-relaxed">
                  Thông tin phản ánh được bảo mật và xử lý theo quy trình nội bộ.
                </p>
              </div>
            </Card>

            <Card className="border border-[#E6E8EE] shadow-none bg-gradient-to-br from-[#F6FAFF] to-white rounded-2xl">
              <div className="p-4 flex flex-col gap-3">
                <h3 className="text-xs font-bold text-[#012047] uppercase tracking-wide">Hướng dẫn</h3>
                {[
                  "Mô tả rõ ràng thời gian và địa điểm xảy ra sự việc.",
                  "Đính kèm ảnh / video nếu có để được xử lý nhanh hơn.",
                  "Phản ánh sẽ được tiếp nhận trong vòng 24 giờ làm việc.",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-4 h-4 rounded-full bg-[#0E82FD]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[9px] font-bold text-[#0E82FD]">{i + 1}</span>
                    </div>
                    <p className="text-[11px] text-[#465D7C] leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </form>
    </section>
  );
}


function StepLabel({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-6 h-6 rounded-lg bg-[#0E82FD] flex items-center justify-center shrink-0">
        <span className="text-[11px] font-bold text-white">{number}</span>
      </div>
      <h2 className="text-sm font-bold text-[#012047]">{title}</h2>
    </div>
  );
}

function SummaryRow({ label, value, icon }: { label: string; value?: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-0.5 shrink-0 ${value ? "text-[#0E82FD]" : "text-[#465D7C]/30"}`}>{icon}</span>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] text-[#465D7C]/50 uppercase tracking-wide block">{label}</span>
        {value ? (
          <span className="text-xs text-[#012047] font-medium truncate block">{value}</span>
        ) : (
          <span className="text-xs text-[#465D7C]/30 italic">Chưa chọn</span>
        )}
      </div>
      {value && <ChevronRight size={11} className="text-[#0E82FD]/40 shrink-0 mt-1" />}
    </div>
  );
}

function SubmitButton({ submitting, isValid }: { submitting: boolean; isValid: boolean }) {
  return (
    <button
      type="submit"
      disabled={!isValid || submitting}
      className={[
        "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
        isValid && !submitting
          ? "bg-[#0E82FD] hover:bg-[#0E82FD]/90 text-white shadow-lg shadow-[#0E82FD]/25 hover:shadow-[#0E82FD]/40"
          : "bg-[#E6E8EE] text-[#465D7C]/40 cursor-not-allowed",
      ].join(" ")}
    >
      {submitting ? (
        <>
          <svg
            className="animate-spin w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Đang gửi...
        </>
      ) : (
        <>
          <Send size={15} />
          Gửi phản ánh
        </>
      )}
    </button>
  );
}
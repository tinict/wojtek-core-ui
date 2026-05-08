"use client";

import { Breadcrumbs, Card, Chip, Label, SearchField } from "@heroui/react";
import { CircleCheck, Clock7 } from "lucide-react";
import Chart, { CategoryScale } from 'chart.js/auto';
import PieChart from "@/components/wojtek-ui/pie-chart/pieChart";
import { useState } from "react";
import NextLink from "next/link";
import { SingleWithCustomIndicator } from "@/components/wojtek-ui/singleWithCustomIndicator";

Chart.register(CategoryScale);

export default function PhanAnhHienTruong() {
  const Data = [
    { id: 1, year: 2016, userGain: 80000, userLost: 823 },
    { id: 2, year: 2017, userGain: 45677, userLost: 345 },
    { id: 3, year: 2018, userGain: 78888, userLost: 555 },
    { id: 4, year: 2019, userGain: 90000, userLost: 4555 },
    { id: 5, year: 2020, userGain: 4300,  userLost: 234  },
  ];

  const [chartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <section className="flex flex-col">
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">
          Trang chủ
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="/phan-anh-hien-truong">
          Phản ánh hiện trường
        </Breadcrumbs.Item>
      </Breadcrumbs>

      <div className="flex items-center justify-center my-4 mt-16">
        <h1 className="text-3xl font-bold font-sans tracking-tight">
          <span className="text-blue-950">Danh sách </span>
          <span className="text-primary">phản ánh</span>
        </h1>
      </div>
      
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Chip size="lg" className="uppercase font-bold hover:bg-accent hover:text-white cursor-default">
            Tất cả
          </Chip>
          <Chip size="lg" className="uppercase font-bold hover:bg-accent hover:text-white cursor-default">
            Đã xử lý
          </Chip>
          <Chip size="lg" className="uppercase font-bold hover:bg-accent hover:text-white cursor-default">
            Đang xử lý
          </Chip>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mx-auto mb-6 my-6">
        <SearchField name="search">
          <SearchField.Group className="bg-[#f6f5f5] rounded-3xl border border-[#E6E8EE] px-4 py-2 w-[300px] h-[40px] focus-within:border-[#0E82FD] focus-within:ring-2 focus-within:ring-[#0E82FD]/15 transition-all">
            <SearchField.SearchIcon />
            <SearchField.Input 
              className="w-full" 
              placeholder="Tra cứu phản ánh" 
            />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
        <div className="ml-2">
          <SingleWithCustomIndicator />
        </div>
      </div>

      <div className="flex items-center border-l-4 border-l-primary p-3 mt-4">
        <h1 className="text-base font-bold uppercase">Phản ánh hiện trường</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
        <section className="lg:col-span-4">
          <NextLink
            href="/phan-anh-hien-truong/1"
            className="text-sm text-[#0E82FD] font-medium"
          >
            <Card className="w-full flex flex-col sm:flex-row items-stretch">
              <div className="relative w-full sm:w-[200px] md:w-[260px] lg:w-[300px] h-[200px] sm:h-auto shrink-0 overflow-hidden rounded-t-2xl sm:rounded-l-2xl sm:rounded-tr-none">
                <img
                  alt="Cherries"
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
                  loading="lazy"
                  src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 min-w-0">
                <Card.Header className="gap-1">
                  <Card.Title className="font-bold leading-snug">
                    Quán bia 540 đường Láng mở loa quá to, hát ầm ĩ
                  </Card.Title>
                  <Card.Description className="line-clamp-4">
                    Trong thời gian dài vừa qua, tôi và nhiều hộ dân tại chung
                    cư thường xuyên bị ảnh hưởng bởi tiếng ồn lớn phát ra từ
                    quán vườn bia 540 đường Láng. Cụ thể, vào các buổi tối, đặc
                    biệt từ khoảng 19h00 đến khuya, quán thường xuyên mở nhạc
                    với âm lượng rất lớn, kèm theo việc hát hò, gây ra tiếng ồn
                    ảnh hưởng nghiêm trọng đến sinh hoạt người dân.
                  </Card.Description>
                </Card.Header>

                <Card.Footer className="mt-auto flex w-full flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[#0E82FD]">
                      <Clock7 size={16} />
                      <span className="text-xs text-muted">
                        Ngày gửi: 12/10/2024
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#0E82FD]">
                      <CircleCheck size={16} />
                      <span className="text-xs text-muted">Đã giải quyết</span>
                    </div>
                  </div>
                </Card.Footer>
              </div>
            </Card>
          </NextLink>
        </section>

        <section className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">

            <Card className="w-full">
              <Card.Header>
                <Card.Title className="font-bold text-base">
                  Thống kê kết quả đã xử lý
                </Card.Title>
              </Card.Header>
              <Card.Description className="flex items-center justify-center">
                <PieChart chartData={chartData} />
              </Card.Description>
            </Card>

            <Card className="w-full">
              <Card.Header>
                <Card.Title className="font-bold text-base">
                  Thống kê mức độ hài lòng
                </Card.Title>
              </Card.Header>
              <Card.Description className="flex items-center justify-center">
                <PieChart chartData={chartData} />
              </Card.Description>
            </Card>

          </div>
        </section>

      </div>
    </section>
  );
}
"use client";

import { Accordion, Breadcrumbs, Card } from "@heroui/react";
import { ChevronDown, CircleCheck, Clock7, FolderOpen, Info, MapPin } from "lucide-react";
import Chart, { CategoryScale } from 'chart.js/auto';
import PieChart from "@/components/wojtek-ui/pie-chart/pieChart";
import { useState } from "react";
import {Table} from "@heroui/react";
import CommentSection from "@/components/wojtek-ui/comment/commentSection";

Chart.register(CategoryScale);

export default function ChiTietPhanAnhHienTruong() {
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

  const items = [
    {
      info: (
         <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Team members">
              <Table.Header>
                <Table.Column></Table.Column>
                <Table.Column isRowHeader>Thông tin</Table.Column>
                <Table.Column>Chi tiết tiếp nhận</Table.Column>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Clock7 />
                  </Table.Cell>
                  <Table.Cell>Thời gian gửi</Table.Cell>
                  <Table.Cell>06/05/2026 09:24</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <FolderOpen />
                  </Table.Cell>
                  <Table.Cell>Lĩnh vực</Table.Cell>
                  <Table.Cell>Giao thông</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <CircleCheck />
                  </Table.Cell>
                  <Table.Cell>Trạng thái</Table.Cell>
                  <Table.Cell>Đã xử lý</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <MapPin />
                  </Table.Cell>
                  <Table.Cell>Địa điểm</Table.Cell>
                  <Table.Cell>
                    Xóm 1 và xóm 2 lục Xuân, Xã Phúc Lộc, Thành phố Hà Nội
                  </Table.Cell> 
                </Table.Row>
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      ),
      content: (
        <Card className="w-full mt-4" variant="secondary">
          <Card.Header>
            <Card.Title>Nội dung phản ánh</Card.Title>
          </Card.Header>
          <Card.Content>
            <p>The default card variant for most use cases</p>
          </Card.Content>
        </Card>
      ),
      icon: <Info />,
      title: "Thông tin phản ánh",
    },
    {
      info: (
        <Card className="w-full mt-4" variant="secondary">
          <Card.Header>
            <Card.Title>Nội dung phản ánh</Card.Title>
          </Card.Header>
          <Card.Content>
            <p>The default card variant for most use cases</p>
          </Card.Content>
        </Card>
      ),
      icon: <Info />,
      title: "Kết quả xử lý",
    },
  ];

  return (
    <section className="flex flex-col">
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">
          Trang chủ
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="/phan-anh-hien-truong">
          Phản ánh hiện trường
        </Breadcrumbs.Item>
        <Breadcrumbs.Item href="/phan-anh-hien-truong/1">
          Chi tiết phản ánh
        </Breadcrumbs.Item>
      </Breadcrumbs>

      <div className="flex items-center mt-4 p-1">
        <h1 className="text-base font-bold uppercase">Quán bia 540 đường Láng mở loa quá to, hát ầm ĩ</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <section className="lg:col-span-4">
          <Accordion className="w-full">
            {items.map((item, index) => (
              <Accordion.Item key={index}>
                <Accordion.Heading>
                  <Accordion.Trigger className="flex items-center mt-4 bg-[#f5f6f6] rounded-2xl border border-[#E6E8EE]">
                    {item.icon ? (  
                      <>{item.icon}</>
                    ) : null}
                    <span className="ml-2 font-bold">
                      {item.title}
                    </span>
                    <Accordion.Indicator>
                      <ChevronDown />
                    </Accordion.Indicator>
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body>
                    <div className="mt-4">
                      {item.info}
                    </div>

                    <div className="mt-4">
                      {item.content}
                    </div>
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
          <CommentSection />
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
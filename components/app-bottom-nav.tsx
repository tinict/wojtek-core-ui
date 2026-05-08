"use client";

import { BottomNav } from "@/components/wojtek-ui/bottom-tab-navigator";
import { Home, Search, User } from "lucide-react";

export function AppBottomNav() {
  return (
    <BottomNav 
        defaultActiveKey="home" 
        variant="default" 
        routes={["/", "/pakn-gui-pakn", "/profile"]}
    >
      <BottomNav.Item navKey="home" href="/">
        <BottomNav.Icon>
          <Home size={22} />
        </BottomNav.Icon>
        <BottomNav.Label>Trang chủ</BottomNav.Label>
      </BottomNav.Item>

      <BottomNav.Item navKey="pakn-gui-pakn" href="/pakn-gui-pakn">
        <BottomNav.Icon>
          <Search size={22} />
        </BottomNav.Icon>
        <BottomNav.Label>Tìm kiếm</BottomNav.Label>
      </BottomNav.Item>

      <BottomNav.Item navKey="profile" href="/profile">
        <BottomNav.Icon>
          <User size={22} />
        </BottomNav.Icon>
        <BottomNav.Label>Cá nhân</BottomNav.Label>
      </BottomNav.Item>
    </BottomNav>
  );
}
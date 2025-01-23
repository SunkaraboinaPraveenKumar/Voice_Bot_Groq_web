"use client"
import {  useUser } from "@clerk/nextjs";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  const { user } = useUser();
  return (
    <div>
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <Hero />
    </div>
  );
}

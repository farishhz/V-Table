import { VelocityScroll } from "@/components/velocity-scroll";
export default function Demo() {
  return (
    <div className="relative flex w-full h-screen flex-col items-center justify-center overflow-hidden">
      <VelocityScroll>404 Page Not Found</VelocityScroll>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}

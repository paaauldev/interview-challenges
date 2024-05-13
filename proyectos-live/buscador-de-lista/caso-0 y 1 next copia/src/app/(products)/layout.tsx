interface MainLayoutProps {
  children: React.ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <main>
      <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
    </main>
  );
}

export default MainLayout;

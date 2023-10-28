import "./BrandCardLoading.css";
export default function BrandCardLoading() {
  return (
    <div className="bg-black opacity-75 w-100 h-100 text-center position-fixed top-0 align-items-center justify-content-center d-flex">
      <span class="brandCardLoader"></span>
    </div>
  );
}

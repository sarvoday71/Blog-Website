export default function ReviewPage() {
  return (
    <div className="hidden md:flex w-1/2 bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center px-12">
      <div className="max-w-md">
        {/* Quote */}
        <p className="text-3xl font-semibold text-gray-900 leading-snug mb-6">
          “Where ideas turn into stories.”
        </p>

        {/* Description */}
        <p className="text-base text-gray-600 leading-relaxed mb-8">
          Read insightful posts, explore new perspectives, and publish your own
          thoughts—all in one place.
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span className="h-px w-6 bg-gray-300" />
          <span className="tracking-wide">Built for readers & writers</span>
        </div>
      </div>
    </div>
  );
}

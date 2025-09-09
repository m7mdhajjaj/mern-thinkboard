import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="flex justify-center items-start px-4 mt-20">
      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 max-w-lg w-full">
        <div className="flex items-center gap-4">
          <div className="bg-green-500/20 p-3 rounded-full flex-shrink-0">
            <ZapIcon className="size-6 text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Rate Limit Reached</h3>
            <p className="text-gray-300 text-sm mb-1">
              You've made too many requests in a short period. Please wait a moment.
            </p>
            <p className="text-gray-400 text-xs">
              Try again in a few seconds for the best experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RateLimitedUI;
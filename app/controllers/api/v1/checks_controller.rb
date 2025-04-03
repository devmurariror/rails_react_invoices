class Api::V1::ChecksController < ApplicationController
  include ApiResponse

  def index
      checks = Check
      .includes(:image_attachment, :image_blob)
      .joins(:company, check_invoices: :invoice)
      .select('checks.id, checks.number AS check_number, checks.created_at, companies.name, STRING_AGG(invoices.number, \', \') AS invoice_numbers')
      .group('checks.id, companies.name, checks.created_at')
      .order('checks.created_at DESC')
      checks_with_images = checks.map do |check|
        image_data = if check.image.attached?
                       {
                         base64: Base64.strict_encode64(check.image.download),
                         content_type: check.image.blob.content_type
                       }
                     else
                       nil
                     end
  
        check.as_json.merge(image_data: image_data)
      end
  
    success_response(checks_with_images)
  rescue StandardError => e
    error_response(e.message)
  end
end

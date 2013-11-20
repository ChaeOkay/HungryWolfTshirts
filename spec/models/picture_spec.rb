require 'spec_helper'

describe Picture do
  it { should validate_presence_of :view }
  it { should belong_to :tshirt}

  context 'with vaid parameters' do
    let(:picture) { Picture.create(view: 'front') }
    it 'should have a default image_name of placeholder.png' do
      expect(picture.image_name).to eq 'placeholder.png'
    end
  end
end
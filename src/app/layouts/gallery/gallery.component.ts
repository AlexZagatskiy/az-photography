import { Component, HostBinding, inject } from '@angular/core';
import { ImageService } from "../../services/image.service";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-gallery',
  imports: [
    NgClass
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
  standalone: true
})
export class GalleryComponent {
  private readonly imageService = inject(ImageService);

  @HostBinding('class') hostClasses = 'min-h-screen block bg-black';

  protected readonly   previewClassConfigs = [
    'w-8/12  absolute -top-20 -left-8 max-md:hidden',
    'w-6/12 z-4 relative top-10 left-4',
    'w-6/12 z-2 relative -top-14 right-4',
    'w-8/12 z-3 absolute -right-4 -bottom-20',
  ];

  protected readonly items = [
    {
      id: 'automotive',
      title: 'Automotive',
      description: 'Capturing the beauty of machines in motion and stillness - from sleek details to full dramatic shots, each image highlights the design and character of every vehicle.',
      examples: this.mapPublicIdsToUrls([
        '562B3D0C-B518-4114-90C0-3DD15C9C2D2A_1_105_c_vbpfoi',
        '8584E614-7A55-4F2A-B55E-6D4182FCDBEB_1_105_c_ymfhbc',
        '7F83268B-9F4C-4BA6-8402-BD40593A81C7_1_201_a_hnf4cy',
        '3B754EDE-3B7C-4F24-A3D5-B995780B1AC7_1_201_a_ymzmeh',
      ])
    },
    {
      id: 'portraits',
      title: 'Portraits',
      description: 'Authentic and expressive portraits that tell a story. My focus is on capturing personality, mood, and natural beauty in every frame.',
      examples: this.mapPublicIdsToUrls([
        'AFA3B436-3A5B-4DF9-822E-B73D5AD6D480_1_105_c_ossyqg',
        'ADD7EC2E-88B7-4F17-B606-B3DEFD2BFA97_1_105_c_zbpvtg',
        '22C03700-A599-4EC9-883F-8CD570ABE932_1_201_a_yaubns',
        '132944DF-D36C-49CD-BBE9-2135BF58B9DC_1_105_c_fpqzsg',
      ])
    },
    {
      id: 'city',
      title: ' Interior & Architecture',
      description: 'Showcasing the harmony of design, light, and space. I create images that bring out the elegance and atmosphere of architectural and interior environments.',
      examples: this.mapPublicIdsToUrls([
        '15C3D554-906A-4BD9-9C98-D559A470433E_1_105_c_xpuwi5',
        '1C2F2ADB-115B-459F-BCB6-60285556C54A_1_105_c_m8jbpi',
        '724E308C-FFAE-43B2-BCBF-66D06EA3A22F_1_105_c_emftzo',
        '4B4E8852-FE7F-40F0-A080-FE9644B51C3E_1_201_a_mpz606'
      ])
    },
    {
      id: 'nature',
      title: 'Nature & Landscape',
      description: 'From sweeping vistas to intimate details, my landscapes highlight the colors, textures, and emotions of the natural world.',
      examples: this.mapPublicIdsToUrls([
        '1D369B56-DFCA-4387-9A45-5036FAFDA60F_1_105_c_h7xdvf',
        'C56E9482-A8F4-49D9-BFA0-FCC849F4A60D_1_105_c_qrxzla',
        '9D235E87-AB00-46E9-AECD-2170F33E55BC_1_105_c_eait5s',
        '62952887-A07A-4991-A6AE-7F777A15851E_1_105_c_w9gbnx'
      ])
    }
  ]

  private mapPublicIdsToUrls(idList: string[]): string[] {
    return idList.map(publicId => this.imageService.getImageUrlByPublicId(publicId, 600)).filter(img => !!img)
  }
}

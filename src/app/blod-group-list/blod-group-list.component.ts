import { Component, TemplateRef, ViewChild } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
export interface BloodGroup {
  id: number;
  bloodGroupName: string;
  count: number;
}
@Component({
  selector: 'app-blod-group-list',
  templateUrl: './blod-group-list.component.html',
  styleUrls: ['./blod-group-list.component.css']
})
export class BlodGroupListComponent {
  title = 'material-dynamic-table-demo';
  ELEMENT_DATA: BloodGroup[] = [
    {
      id: 1,
      bloodGroupName: "A+",
      count: 0
    },
    {
      id: 2,
      bloodGroupName: "B+",
      count: 0
    },
    {
      id: 3,
      bloodGroupName: "O+",
      count: 0
    },
    {
      id: 4,
      bloodGroupName: "AB+",
      count: 0
    },
    {
      id: 5,
      bloodGroupName: "A-",
      count: 0
    },
    {
      id: 6,
      bloodGroupName: "B-",
      count: 0
    },
    {
      id: 7,
      bloodGroupName: "O-",
      count: 0
    },
    {
      id: 8,
      bloodGroupName: "AB-",
      count: 0
    }
  ];
  displayedColumns: string[] = ['id', 'bloodGroupName', 'count', 'actions'];
  dataSource = this.ELEMENT_DATA;
  countValue = new FormControl();
  selectedData: any;
  dialogRef: any;
  RequestBloodDialogDialogRef: any;
  requiredCountArray: any = [];
  requiredBlood: FormGroup;
  isCountAvailable: Boolean = true;
  constructor(
    private dialog: MatDialog
  ) { }

  @ViewChild('EditCount', { static: true }) EditCount: TemplateRef<any>;
  @ViewChild('RequestBloodDialog', { static: true }) RequestBloodDialog: TemplateRef<any>;

  ngOnInit() {
    this.requiredBlood = new FormGroup({
      requiredBloodGroup: new FormControl('', Validators.required),
      requiredBloodGroupCount: new FormControl()
    });
  }
  getRecord(myRowData: any) {
    console.log(myRowData);
    this.dialogRef = this.dialog.open(this.EditCount);
    this.selectedData = this.dataSource.find(res => res.id == myRowData.id);
    console.log(this.selectedData, 'select');
    this.countValue.setValue(this.selectedData.count)
  }
  editCount() {
    this.dataSource.find(res => {
      if (res.id == this.selectedData.id) {
        res.count = this.countValue.value
      }
    });
    console.log('after edit', this.dataSource);
    this.dialogRef.close();
  }
  requestBlood() {
    this.requiredBlood.reset();
    this.RequestBloodDialogDialogRef = this.dialog.open(this.RequestBloodDialog);
  }
  selectionChange(e: any) {
    console.log('selection change', e);
    this.dataSource.find(res => {
      if (res.id == e.value) {
        console.log('inside if', res.count, this.requiredBlood);
        this.requiredCountArray = Array.from({ length: res.count }, (_, i) => i + 1)
        console.log('requiredCountArray', this.requiredCountArray);
        this.isCountAvailable = this.requiredCountArray.length ? true : false;
        console.log('this.isCountAvailable',this.isCountAvailable);
        if(this.isCountAvailable) {
          this.requiredBlood.get('requiredBloodGroupCount')?.setValidators(Validators.required);
        }
        // this.requiredBlood.controls["requiredBloodGroupCount"].setValue(200);
        // this.requiredBlood.get('requiredBloodGroupCount')?.setValue(res.count);
      }
    });
  }
  saveRequestBlood() {
    console.log(this.requiredBlood.value);
    this.dataSource.find(res => {
      if (res.id == this.requiredBlood.value.requiredBloodGroup) {
        res.count = res.count - this.requiredBlood.value.requiredBloodGroupCount
      }
    });
    console.log('after rerquest', this.dataSource);
    this.RequestBloodDialogDialogRef.close();
    this.requiredBlood.reset();
  }

}

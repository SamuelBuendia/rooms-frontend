import { Component, OnInit } from '@angular/core';
import { FolderService as ModelService } from '../_services/folder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FolderModel as Model } from '../_models/folder.model';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastService } from 'src/app/modules/toast/_services/toast.service';
import { AuthService } from 'src/app/modules/auth';

@Component({
    selector: 'app-folders',
    templateUrl: './folders.component.html',
    styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {

    public promiseForm: Promise<any>;

    public models: Model[];
    public selectedModels: Model[];

    public page: number;
    public total_page: number;
    public per_page: number;
    public totalRecords: number;

    public sort: string;
    public query: string;
    public filters: { key: string, value: string }[];
    public _with: { key: string, value: string }[];

    public formGroup: FormGroup;
    public folder_id_filter: AbstractControl;
    public department_id_filter: AbstractControl;
    public venue_id_filter: AbstractControl;

    searchGroup: FormGroup;

    public requesting: boolean;

    public confirmDialogPosition: string;
    public message_confirm_delete: string;

    public showTableCheckbox: boolean;

    public roomId: number;
    public parent: string;

    constructor(
        public modelsService: ModelService,
        public translate: TranslateService,
        private router: Router,
        private route: ActivatedRoute,
        private confirmationService: ConfirmationService,
        private toastService: ToastService,
        public authService: AuthService,
        fb: FormBuilder) {
        this.formGroup = fb.group({
            'folder_id_filter': [''],
            'department_id_filter': [''],
            'venue_id_filter': [''],
        });
        this.folder_id_filter = this.formGroup.controls['folder_id_filter'];
        this.department_id_filter = this.formGroup.controls['department_id_filter'];
        this.venue_id_filter = this.formGroup.controls['venue_id_filter'];

        this.searchGroup = fb.group({
            searchTerm: [''],
        });

        this.translate.get('COMMON.MESSAGE_CONFIRM_DELETE').subscribe((res: string) => {
            this.message_confirm_delete = res;
        });

        this.showTableCheckbox = false;
        this.parent = '';

        this.page = 1;
        this.total_page = 0;
        this.per_page = 100
        this.totalRecords = 0;

        this.requesting = false;

        this.confirmDialogPosition = 'right';

        this.models = [];
        this.selectedModels = [];
        // this.getModels();
    }

    ngOnInit() {
        this.requesting = false;

        this._with = [];
        this._with.push({key: 'include[]', value: 'functionary.*'})
    }

    public loadLazy(event?: LazyLoadEvent) {
        if (event) {
            this.page = (event.first / this.per_page) + 1;
            if (event.sortField) {
                if (event.sortOrder === -1) {
                    this.sort = '-' + event.sortField;
                } else {
                    this.sort = event.sortField;
                }
            } else {
                this.sort = '-id';
            }

            if (event.globalFilter) {
                this.query = event.globalFilter;
            } else {
                this.query = undefined;
            }

            if (event.rows) {
                this.per_page = event.rows;
            }    
        }

        this.filters = [];
        if (this.route.parent.parent.parent.snapshot.url.length > 0) {
            this.route.parent.parent.parent.params.subscribe((params) => {
                if (this.route.parent.parent.parent.parent.parent.snapshot.url.length > 0) {
                    this.roomId = params.id;
                    this.parent = '/' + this.route.parent.parent.parent.parent.parent.snapshot.url[0].path + '/edit/' + this.roomId;
                    this.filters.push({ key: 'filter{room}', value: this.roomId.toString() })
                }
                this.getModels();
            });
        } else {
            this.getModels();
        }
    }

    public getModels() {
        this.requesting = true;
        this.modelsService.get(this.page, this.per_page, this.sort, this.query, this.filters, this._with).toPromise().then(
            response => {
                this.requesting = false;
                // this.models = response.folders;
                this.models = [];
                response.folders.forEach(element => {
                    this.models.push(element);
                });
                if(response.functionaries){
                    response.functionaries.forEach(functionary => {
                        this.models.forEach(element => {
                            if (element.functionary === functionary.id) {
                                element.functionary = functionary;
                            }
                        });
                    });
                }
                this.totalRecords = response.meta.total_results;
            },
            error => {
                this.requesting = false;
                if (error.status == 404) {
                    this.toastService.growl('error', 'Not Found')
                } else {
                    let messageError = [];
                    if (!Array.isArray(error.error)) {
                        messageError.push(error.error);
                    } else {
                        messageError = error.error;
                    }
                    Object.entries(messageError).forEach(
                        ([key, value]) => this.toastService.growl('error', key + ': ' + value)
                    );
                }
            }
        );
    }

    // public showDeleteDialog(user: Model) {
    //     let message;
    //     this.translate.get('Do you want to delete?').subscribe((res: string) => {
    //         message = res;
    //     });

    //     let header;
    //     this.translate.get('Delete Confirmation').subscribe((res: string) => {
    //         header = res;
    //     });

    //     this.confirmationService.confirm({
    //         message: message,
    //         header: header,
    //         icon: 'fa fa-trash',
    //         accept: () => {
    //             this.delete(user);
    //         }
    //     });
    // }

    public delete(id) {
        this.modelsService.delete(id).toPromise().then(
            response => {
                this.toastService.growl('success', 'Delete');
                this.getModels();
            },
            error => {
                if (error.status == 404) {
                    this.toastService.growl('error', 'Not Found')
                } else {
                    let messageError = [];
                    if (!Array.isArray(error.error)) {
                        messageError.push(error.error);
                    } else {
                        messageError = error.error;
                    }
                    Object.entries(messageError).forEach(
                        ([key, value]) => this.toastService.growl('error', key + ': ' + value)
                    );
                }
            }
        );
    }

    public patch(values: Model) {
        const param = {
            // 'activated': values.activated
        };
        if (values) {
            const promise = this.modelsService.patch(values.id, param);
            this.promiseForm = promise.toPromise().then(
                response => {
                    this.toastService.growl('success', 'Patch');
                },
                error => {
                    if (error.status == 404) {
                        this.toastService.growl('error', 'Not Found')
                    } else {
                        let messageError = [];
                        if (!Array.isArray(error.error)) {
                            messageError.push(error.error);
                        } else {
                            messageError = error.error;
                        }
                        Object.entries(messageError).forEach(
                            ([key, value]) => this.toastService.growl('error', key + ': ' + value)
                        );
                    }
                }
            );
        }
    }

    confirm(id, folder: string) {
        this.confirmDialogPosition = folder;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete?',
            accept: () => {
                this.delete(id);
            }
        });
    }
}
